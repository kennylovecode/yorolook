// frontend_yorolook/src/api/cart/types.ts
export interface CartItem {
  id: string;
  article_uuid: string;
  article_sku_uuid: string;
  quantity: number;
  account_uuid: string; // 用户ID
  created_at: string;
  updated_at: string;
}

export interface CartRequest {
  article_uuid: string;
  article_sku_uuid: string;
  quantity: number;
}
export interface CartItemResponse extends CartItem {
  title: string;
  sub_title: string;
  sale_price: number;
  market_price: number;
  image: string;
  is_fake: boolean;
}

export interface Order{
  id: string; // char(36)
  account_uuid: string; // varchar(255)
  order_no: string; // varchar(50)
  total_amount: number; // int(11)
  status: number; // int(11)
  payment_method: string; // varchar(20)
  payment_time: string; // datetime
  shipping_address: object; // json
  remark: string; // varchar(500)
  created_at: string; // datetime
  updated_at: string; // datetime
}
export interface OrderItem {
  id: string; // char(36)
  order_uuid: string; // varchar(255)
  article_uuid: string; // varchar(255)
  article_sku_uuid: string; // varchar(255)
  quantity: number; // int(11)
  price: number; // int(11)
  total_amount: number; // int(11)
  created_at: string; // datetime
  updated_at: string; // datetime
}
