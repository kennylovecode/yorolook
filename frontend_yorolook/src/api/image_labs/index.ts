import { request } from "@/utils/service"
import { IListResponse, IResponse } from "../types"
import { IImageLab } from "./type"

export const getList = (source_image: string, view: boolean = false) => {
  return request<IListResponse<IImageLab>>({
    url: `/image_lab/list`,
    method: "POST",
    data: {
      source_image,
      view: view ? 1 : 0
    }
  })
}

export const create = (data: any) => {
  return request<IResponse<IImageLab>>({
    url: `/image_lab/create`,
    method: "put",
    data
  })
}

export const update = (data: any) => {
  return request<IResponse<IImageLab>>({
    url: `/image_lab/update`,
    method: "put",
    data
  })
}

export const deleteById = (id: number) => {
  return request<IResponse<IImageLab>>({
    url: `/image_lab/delete`,
    method: "DELETE",
    data: {
      id: `${id}`
    }
  })
}
