export type VariantSet = {
  name: string
  options: string[]
}

type Category = { category: string; subCategory: string }

type ProductId = string

type StockInfo = {
  [key: string]:
    | StockInfo
    | { availability: number; price: Price; imagesUrl: string }
}

export type ProductSet = {
  id: ProductId
  name: string
  description: string
  variants?: VariantSet[]
  category?: Category
  stockInfo: StockInfo
}
