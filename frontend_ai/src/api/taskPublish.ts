import { IListRequest, IListResponse, IResponse } from "./types/base"
import { request } from "./service"
import { ITaskPublish } from "./types/task"

function list(query: IListRequest) {
  return request<IListResponse<ITaskPublish>>({
    url: "task_publish/list",
    method: "post",
    data: query
  })
}

function create(data: any) {
  return request<IResponse<any>>({
    url: "task_publish/create",
    method: "post",
    data
  })
}

function update(data: any) {
  return request<IResponse<any>>({
    url: `task_publish/update`,
    method: "post",
    data
  })
}
function get(id: string) {
  return request<IResponse<ITaskPublish>>({
    url: `task_publish/${id}`,
    method: "get"
  })
}

export default { list, create, get, update }
