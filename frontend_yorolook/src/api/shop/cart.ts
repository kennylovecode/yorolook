// frontend_yorolook/src/api/cart/index.ts
import { request } from "@/utils/service";
import type { CartItem, CartRequest, CartItemResponse } from "./type";
import { IListResponse, IResponse } from "../types";

export const addToCart = (data: CartRequest) => {
  return request<IResponse<CartItem>>({
    url: "/cart/create",
    method: "put",
    data
  });
};

export const getCartList = (data: { idx: number; size: number  }) => {
  return request<IListResponse<CartItemResponse>>({
    url: "/cart/list",
    method: "post",
    data
  });
};

export const deleteCartItem = (id: string) => {
  return request<IResponse<CartItem>>({
    url: `/cart/${id}`,
    method: "delete"
  });
};

export const updateCartItem = (data: CartRequest) => {
  return request<IResponse<CartItem>>({
    url: "/cart/update",
    method: "put",
    data
  });
};

// 其他购物车相关的 API 请求可以在这里添加
