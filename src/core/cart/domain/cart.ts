import { Product } from "@/core/types"

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
  // clear(): void
}
