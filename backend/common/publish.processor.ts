import { Plugins } from "node-resque";
import type { ServiceBroker } from "moleculer";

/**
 * 创建任务处理器
 * @param broker 服务代理
 * @returns 处理器
 */
export function createProcessor(broker: ServiceBroker) {
  return {
    /**
     * 下载图片
     */
    download: {
      plugins: [Plugins.JobLock],
      pluginOptions: {
        JobLock: { reEnqueue: true },
      },
      perform: async (taskPublish: any) => {
        // get user
        const user = await broker.call("account._get", { id: taskPublish.account_uuid });
        // get images
        let urls = taskPublish.images.filter((url: any) => typeof url === 'string' && url.startsWith('http'));

        if(urls.length===0)
          urls = taskPublish.images.map(x => x.previewPath);
        console.log(urls) 
        // download images
        const downloadPromises = urls.map(async (url: string) => {
          try {
            const result: any = await broker.call("file.remoteLink", { link: url, dir: taskPublish.directory_uuid }, { meta: { user } });
            return result.id;
          } catch (error) {
            console.error(`Failed to download image from ${url}:`, error);
            return null;
          }
        });
        // save images
        const ids = (await Promise.all(downloadPromises)).filter(Boolean);
        return ids;
      },
    },
  };
}