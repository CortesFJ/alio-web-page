export type Variant = {
  name: string
  options: string[]
}

export type Price = { currency: string; amount: string }

type Category = { category: string; subCategory: string }

type ProductId = string

type Stock = {
  [key: string]: Stock | { availability: number; price: Price }
}

export type Product = {
  id: ProductId
  name: string
  description: string
  price?: Price
  variants?: Variant[]
  category?: Category
  imageUrl: string
  stock: Stock
}
