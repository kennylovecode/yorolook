import { IListRequest, IListResponse, IResponse } from "./types/base"
import { request } from "./service"
import { IHistoryChat } from "./types/aiproxy"
/**
 * 查询我的任务列表
 *
 * 该函数用于根据指定的状态和其他查询条件，异步获取当前用户的任务列表
 * 它结合了IListRequest接口和一个额外的status属性作为查询参数
 *
 * @param query {IListRequest & { status:number }}：一个包含列表请求参数的对象，包括分页信息、筛选条件等
 * @returns {Promise<IListResponse<ITask>>}：返回一个Promise，解析为包含任务列表的响应对象
 */
function my(query: IListRequest & { model: string }) {
  return request<IListResponse<IHistoryChat>>({
    url: "account_chat/my",
    method: "post",
    data: query
  })
}

export default { my }