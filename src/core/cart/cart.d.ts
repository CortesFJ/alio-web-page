import { Product, ProductId, Price } from "@/core/product-repository/product"

export interface CartItem {
  product: Product
  quantity: number
}

export type CartState = {
  items: CartItem[]
  totalPrice: Price
}

export interface Cart {
  add(product: Product, quantity?: number): void
  remove(product: ProductId, quantity?: number): void
  getState(): CartState
  on(eventName: string, listener: (...args: any[]) => void): this
  off(eventName: string, listener: (...args: any[]) => void): void
  clear(): void
}
