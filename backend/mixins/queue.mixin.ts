import { ServiceSchema } from 'moleculer';
import { Queue, Worker } from 'node-resque';
import { QueueServiceSchema } from '../models/types';

const connectionDetails = {
    host: '127.0.0.1',
    port: 6379,
};

const queue = new Queue({ connection: connectionDetails });
const worker = new Worker({ connection: connectionDetails });

export default function createQueueService(queueOpts?: any): QueueServiceSchema {

	const redisConnOpts = {
		pkg: "ioredis",
		host: "127.0.0.1",
		password: null,
		port: 6379,
		database: 0,
	};
	const schema: ServiceSchema = {
		name: 'resque',

		async started() {
			// 注册任务
			worker.on('job', async (job) => {
				// 处理任务的逻辑
				await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟异步处理
			});

			// 启动工作程序
			await worker.connect();
			await worker.start();
		},

		actions: {
			addJob: {
				params: {
					queue: { type: 'string' },
					data: { type: 'object' },
				},
				async handler(ctx) {
					const { queue, data } = ctx.params;
					await queue.enqueue(queue, data);
					return { message: 'Job added to the queue', data };
				},
			},
		},
	};

	return schema;
}
