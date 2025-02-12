import { Errors, type Context, type ServiceSchema } from "moleculer";
import createDbServiceMixin from "../mixins/db.mixin";
import type { DbModel } from "../models/types";
import fs from "fs";
import path from "path";
import { count } from "console";

/** Helper function to load a module synchronously */
const loadModuleSync = (filePath: string) => {
	try {
		return require(filePath);
	} catch (err) {
		return null;
	}
};

/** Generate actions synchronously */
const generateActions = (paramPath: string) => {
	const actions: Record<string, any> = {
		health: {
			rest: "GET /health",
			handler(ctx: any) {
				return "Ok!";
			},
		},
		get: {
			rest: "GET /:id",
			auth: true,
			params: { id: "string" },
			async handler(ctx: Context<{ id: string }, any>) {
				const model = await this.adapter.findById(ctx.params.id);
				if (!model) {return {};}
				if (model.account_uuid && model.account_uuid !== ctx.meta.user.id && !ctx.meta.user.manage) {
					throw new Errors.MoleculerClientError("No permission");
				}
				return model;
			},
		},
		_list: {
			params: { query: { type: "object", optional: true } },
			async handler(ctx: Context<any, any>) {
				const { query } = ctx.params;
				return query ? this.adapter.find({ query }) : [];
			},
		},
		_get: {
			params: {
				id: "string"
			},
			async handler(ctx: Context<{ id: string }, any>) {
				const model = this.adapter.findById(ctx.params.id);
				return model
			},
		},
	};

	// Dynamically load DTO and create/update actions
	const { createParams, updateParams, listParams } = loadModuleSync(paramPath) || {};
	if (createParams) {
		actions.create = {
			rest: "PUT /create",
			auth: true,
			params: createParams,
			restricted: true,
			async handler(ctx: Context<typeof createParams, any>) {
				const insertModel = { ...ctx.params };
				return this.adapter.insert(insertModel);
			},
		};
	}

	if (updateParams) {
		actions.update = {
			rest: "PUT /update",
			auth: true,
			params: { id: "string" } && updateParams,
			restricted: true,
			async handler(ctx: Context<typeof updateParams, any>) {
				return this.adapter.updateById(ctx.params.id, { $set: ctx.params });
			},
		};
	}

	if (listParams) {
		actions.list = {
			rest: "GET /list",
			auth: true,
			params: listParams,
			async handler(ctx: Context<typeof listParams, any>) {
				const { idx, size, keywords, sort } = ctx.params;
				const list = await this.adapter.find({
					limit: size,
					offset: (idx - 1) * size,
					sort: sort ? [sort] : "",
				});
				const total = await this.adapter.count();
				return { list, total };
			},
		};
	}

	// Delete action
	actions.delete = {
		rest: "DELETE /delete",
		auth: true,
		params: { id: "string" },
		restricted: true,
		async handler(ctx: Context<{ id: string }, any>) {
			const num =  await this.adapter.removeById(ctx.params.id);
			return num
		},
	};


	actions._listByQuery = {
		params: {
			query: "object"
		},
		async handler(ctx: any){
			const dbSet = await this.adapter.find({
				query: ctx.params.query
			});
			return dbSet
		}
	}

	return actions;
};

/** Create Service */
const createService = (serviceName: string, modelName?: string, customModel?: DbModel): ServiceSchema => {
	const entitiesPath = path.join(process.cwd(), `/models/entities/${modelName || serviceName}.ts`);
	const paramPath = path.join(process.cwd(), `/models/dtos/${modelName || serviceName}.ts`);
	const seeds = loadModuleSync(path.join(process.cwd(), `/data/seeds.ts`)) || {};

	// Use custom model if provided, otherwise load from the generated model
	const { model } = loadModuleSync(entitiesPath) || { model: customModel };

	const mixins = []
	if (model) {
		mixins.push(createDbServiceMixin(model));
	}

	// Create the service object here and pass it to generateActions
	const service: ServiceSchema = {
		name: serviceName.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`),
		mixins,
		settings: {},
		dependencies: [],
		events: {},
		methods: {},
		created() {
		},
		started() {
			// Seed data insertion if needed
			if (seeds[`${serviceName}Seeds`]?.length && this?.adapter) {
				// eslint-disable-next-line @typescript-eslint/no-shadow
				this.adapter.count().then((count: number)=>{
					if (count === 0) {
						this.adapter.insertMany(seeds[`${serviceName}Seeds`]);
					}
				})
			}
		},
		stopped() { },
	};

	service.actions = generateActions(paramPath);
	return service;
};

export default createService;
