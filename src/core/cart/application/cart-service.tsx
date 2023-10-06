import { Cart, CartState, CartItem } from "@/core/cart/domain/cart"
import { Product, Price } from "@/types"

export class CartService implements Cart {
  private state: CartState = {
    items: [],
    totalPrice: { currency: "USD", amount: "0" },
  }

  calculateTotalPrice = (cartItems: CartItem[]): Price => {
    const currency = this.state.totalPrice.currency
    let totalPrice = 0
    if (cartItems.length) {
      totalPrice = cartItems.reduce(
        (acc, item) =>
          acc + parseFloat(item.product.price.amount) * item.quantity,
        0
      )
    }
    return {
      currency: currency,
      amount: totalPrice.toFixed(2),
    }
  }

  updateState = (updatedItems: CartItem[]): void => {
    const newTotalPrice = this.calculateTotalPrice(updatedItems)
    this.state = {
      items: updatedItems,
      totalPrice: newTotalPrice,
    }
  }

  add(product: Product, quantity: number = 1): void {
    const updatedItems: CartItem[] = [...this.state.items]
    const existingItemIndex = updatedItems.findIndex(
      (item) => item.product.id === product.id
    )

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity = quantity
    } else {
      updatedItems.push({
        product: product,
        quantity,
      })
    }
    this.updateState(updatedItems)
    // $ TODO save cart state to localStorage
  }

  remove(productId: string): void {
    const items: CartItem[] = this.state.items
    const updatedItems: CartItem[] = items.filter(
      (item) => item.product.id !== productId
    )

    this.updateState(updatedItems)
  }
  getState(): CartState {
    return { ...this.state }
  }
}

export default new CartService()
