import { request } from "@/utils/service"
import type * as User from "./types"
import type { IListRequest, IListResponse, IResponse } from "../types"

export function getAccountInfoApi(id?: string) {
  if (id) {
    return request<IResponse<User.Account>>({
      url: `account/show/${id}`,
      method: "get"
    })
  }
  return request<IResponse<User.Account>>({
    url: "account/me",
    method: "get"
  })
}

export function setPrivacyApi(data: User.AccountPrivacy) {
  return request<IResponse<User.AccountPrivacy>>({
    url: "account/set-privacy",
    method: "put",
    data: {
      privacy: data
    }
  })
}

export function setPreferenceApi(data: User.AccountPreference) {
  return request<IResponse<User.AccountPreference>>({
    url: "account/set-preference",
    method: "put",
    data: {
      preference: data
    }
  })
}

export function setBanners(data: any) {
  return request<IResponse<string>>({
    url: "account_profile/set-banners",
    method: "put",
    data
  })
}

export function saveAccountProfileApi(data: User.AccountProfile) {
  return request<IResponse<User.AccountProfile>>({
    url: "account_profile/my/save",
    method: "put",
    data
  })
}

/** 登录并返回 Token */
export function getList(data: IListRequest) {
  return request<IListResponse<User.Account>>({
    url: "account/list",
    method: "post",
    data
  })
}

export function getById(id: string) {
  return request<IResponse<User.Account>>({
    url: `account/${id}`,
    method: "get"
  })
}
export const create = (data: User.Account) => {
  return request<IResponse<User.Account>>({
    url: "account/create",
    method: "post",
    data
  })
}
export const update = (data: User.Account) => {
  return request<IResponse<User.Account>>({
    url: "account/update",
    method: "put",
    data
  })
}

export const deleteById = (id: string) => {
  return request<IResponse<User.Account>>({
    url: "account/delete",
    method: "delete",
    data: {
      id
    }
  })
}

export const getAccountType = (id: number)=>{
  return request<IResponse<User.AccountType>>({
    url: `type/${id}`,
    method: "get"
  })
}

export const requestAccountType = (data: User.AccountTypeRequest)=>{
  return request<IResponse<User.AccountTypeRequest>>({
    url: "account_request",
    method: "post",
    data
  })
}

export const myRequestAccountType = ()=>{
  return request<IListResponse<User.AccountTypeRequest>>({
    url: "account_request/my",
    method: "post",
  })
}

export const listAccountTypeRequest = (data: User.IListTypeRequestQuery)=>{
  return request<IListResponse<User.AccountTypeRequest>>({
    url: "account_request/list",
    method: "post",
    data
  })
}


export const approveAccountTypeRequest = (data: User.IApproveRequest)=>{
  return request<IResponse<User.AccountTypeRequest>>({
    url: "account_request/approve",
    method: "post",
    data
  })
}

/** 切换身份 */
export const switchType = (id: string)=>{
  return request<IResponse<User.AccountTypeRequest>>({
    url: "account/switch",
    method: "post",
    data: {
      type_id: id
    }
  })
}
