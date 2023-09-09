type calculate_totalPrice = (products: Product[]) => Price

interface CartActions extends calculate_totalPrice {
  add(product: Product): void
  remove(product: Product): void
  clear(): void
}

interface Cart extends CartActions {
  products: Product[]
  totalPrice: number
}

interface Cart {
  products: CartItem[]
  totalPrice: Price
}

interface CartActions {
  addToCart(product: Product, quantity: number): void
  removeFromCart(product: Product): void
  clearCart(): void
}

interface CartItem {
  product: Product
  quantity: number
  totalPrice: Price
}
