import type { ActionParamSchema } from "moleculer"

/**
 * 统一返回
 */
export interface Response {
	code: number
	message: string
	data: unknown
}
/**
 * 统一成功返回
 */
export interface ResponseSuccess<T> extends Response{
	data: T
}
/**
 * 统一列表返回
 */
export interface ResponseList<T> extends Response{
	data: T[]
	total: number
}
/**
 * 统一错误返回
 */
export interface ResponseError extends Response{
	stack: string
}
