export interface IImageLab {
  id: number
  title: string
  source_image?: string
  target_article_uuid: string
  target_article_sku_uuid: string
  target_brand_uuid: string
  target_amount: number
  start_x: number
  start_y: number
  end_x: number
  end_y: number
  jump_link: string
}
