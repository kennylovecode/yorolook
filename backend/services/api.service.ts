import type { IncomingMessage, ServerResponse } from "http";
import type { Context, ServiceSchema } from "moleculer";
import type { ApiSettingsSchema, GatewayResponse, IncomingRequest, Route } from "moleculer-web";
import ApiGateway from "moleculer-web";
import authGuardMixin from "../mixins/authGuard.mixin";

const ApiService: ServiceSchema<ApiSettingsSchema> = {
	name: "base",
	mixins: [ApiGateway, authGuardMixin],
	// More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html
	settings: {
		// Exposed port
		port: process.env.PORT != null ? Number(process.env.PORT) : 3000,

		// Exposed IP
		ip: "0.0.0.0",
		// Global CORS settings for all routes
		cors: {
			// Configures the Access-Control-Allow-Origin CORS header.
			origin: "*",
			// Configures the Access-Control-Allow-Methods CORS header.
			methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
			// Configures the Access-Control-Allow-Headers CORS header.
			allowedHeaders: "*",
			// Configures the Access-Control-Expose-Headers CORS header.
			exposedHeaders: [],
			// Configures the Access-Control-Allow-Credentials CORS header.
			credentials: false,
			// Configures the Access-Control-Max-Age CORS header.
			maxAge: 3600,
		},
		// Global Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
		use: [],
		routes: [
			{
				path: "/api",

				whitelist: ["**"],

				// Route-level Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
				use: [],

				// Enable/disable parameter merging method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Disable-merging
				mergeParams: true,

				// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
				authentication: true,

				// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
				authorization: true,

				// The auto-alias feature allows you to declare your route alias directly in your services.
				// The gateway will dynamically build the full routes from service schema.
				autoAliases: true,

				aliases: {},

				/**
				 * Before call hook. You can check the request.
				 */
				onBeforeCall(
					ctx: Context<any, any>,
					route: Route,
					req: IncomingRequest,
					res: GatewayResponse,
				): void {
					// Set request headers to context meta
					// const remoteHost = req.headers["x-forwarded-for"] as string;
					// console.log("remoteHost:", req)
					// if (remoteHost) {
					// 	const arr = remoteHost.split(":");
					// 	ctx.meta.clientIp = arr[0];
					// 	ctx.meta.clientIpPort = arr[1];
					// 	ctx.meta.clientFamily = req.socket.remoteFamily;
					// }
				},
				/**
				 * After call hook. You can modify the data.
				 */
				onAfterCall(
					ctx: Context,
					route: Route,
					req: IncomingRequest,
					res: GatewayResponse,
					data: unknown,
				): unknown {
					const resultData: any = data as any;
					if (resultData?.code > 0) {
						return {
							code: 0,
							message: resultData.message,
							data: {
								...resultData,
							},
						};
					}
					if (resultData?.list || resultData?.total >= 0) {
						return {
							code: 1,
							message: "success",
							data: resultData.list,
							total: resultData.total,
							model: resultData.model,
							reason: resultData.reason,
						};
					}
					return { code: 1, message: "success", data };
				},
				// Calling options. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Calling-options
				callOptions: {},
				bodyParsers: {
					json: {
						strict: false,
						limit: "10MB",
					},
					urlencoded: {
						extended: true,
						limit: "10MB",
					},
				},

				// Mapping policy setting. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Mapping-policy
				mappingPolicy: "all", // Available values: "all", "restrict"

				// Enable/disable logging
				logging: true,
			},
			{
				path: "/disk",
				bodyParsers: {
					json: false,
					urlencoded: false,
				},
				// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
				authentication: true,
				// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
				authorization: true,
				aliases: {
					"POST /upload_url": "dir.uploadUrl",
					"GET /view": "file.previewImage",
					"GET /fileview": "file.previewFile",
					"GET /download": "dir.download",
					"POST /upload": "multipart:dir.upload",
					"POST /upload_pub": "multipart:file.uploadPub",
					"POST /upload_pub_url": "multipart:file.uploadPubUrl",
				},
				busboyConfig: {
					limits: {
						files: 1,
					},
				},
				callOptions: {
					meta: {},
				},
				mappingPolicy: "restrict",
			},
			{
				path: "/aigc",
				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB",
					},
					urlencoded: {
						extended: true,
						limit: "1MB",
					},
				},
				// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
				authentication: true,
				// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
				authorization: true,
				aliases: {
					"POST /chat": "aigc.chat",
					"POST /generate": "aigc.imageGenerate",
					"get /fetch_mj": "aigc.MJfetch",
				},
				// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
				onAfterCall(
					ctx: Context,
					route: Route,
					req: IncomingRequest,
					res: GatewayResponse,
					data: unknown,
				): unknown {
					return data;
				},
				mappingPolicy: "restrict",
			},
			{
				path: "/util",
				aliases: {
					"GET /download_file": "file.download",
				},
				// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
				authentication: true,

				// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
				authorization: true,
			},
		],
		// Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
		log4XXResponses: false,
		// Logging the request parameters. Set to any log level to enable it. E.g. "info"
		logRequestParams: null,
		// Logging the response data. Set to any log level to enable it. E.g. "info"
		logResponseData: null,

		// Serve assets from "public" folder. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Serve-static-files
		assets: {
			folder: "public",

			// Options to `server-static` module
			options: {},
		},
		onError(req: IncomingMessage, res: ServerResponse<IncomingMessage>, error: any): void {
			console.log("error");
			res.setHeader("Content-Type", "application/json");

			if (error.code > 0) {
				res.writeHead(error.code);
			} else {
				res.writeHead(200);
			}
			res.end(
				JSON.stringify({
					code: error.code || 0,
					message: error.message,
					stack: error.stack,
				}),
			);
		},
	},
	methods: {},
};

export default ApiService;
