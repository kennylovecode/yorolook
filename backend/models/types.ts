import type { Context, Service, ServiceSchema } from "moleculer";
import type { DbAdapter, MoleculerDB } from "moleculer-db";
import { Worker, Plugins, Scheduler, Queue } from "node-resque";

export interface DbModel {
	name: string
	define: object
	options: object
}
export type DbServiceMethods = {
	seedDb?(): Promise<void>;
};
export type DbServiceSchema = Partial<ServiceSchema> &
	Partial<MoleculerDB<DbAdapter>> & {
		model: DbModel;
	};
export type DbServiceThis = Service & DbServiceMethods;


export type QueueServiceSchema = Partial<DbServiceSchema> & {
	taskCount?: number|0
	taskCompletedCount?: number|0
	queue?: Queue,
	worker?: Worker
	scheduler?: Scheduler
}


export interface StabilityAI {

}
