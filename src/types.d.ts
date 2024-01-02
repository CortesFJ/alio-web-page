export type Price = { currency: string; amount: string }
export type ProductId = string

export type Variants = Record<string, string>

type Category = { category: string; subCategory: string }

export type Product = {
  id: ProductId
  productSet?: string
  name: string
  description: string
  price: Price
  imageUrls: string[]
  variants: Variants
  category?: Category
  stock: number
}
