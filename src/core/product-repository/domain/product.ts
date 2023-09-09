export type Variant = {
  name: string
  option: string
}

type Category = { category: string; subCategory: string }

export type Product = {
  id: ProductId
  name: string
  description: string
  price: Price
  imagesUrl: string
  variants?: Variant[]
  category?: Category
  stock: string
}
