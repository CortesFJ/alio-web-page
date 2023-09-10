import { Cart, CartState, CartItem } from "@/core/cart/domain/cart"
import { Product } from "@/core/types"

export class CartService implements Cart {
  private cartState: CartState = {
    items: [],
    totalPrice: { currency: "USD", amount: "0" },
  }
  calculateTotalPrice = (cartItems: CartItem[]): Price => {
    const currency = this.cartState.totalPrice.currency
    let totalPrice = 0
    if (cartItems.length) {
      totalPrice = cartItems.reduce(
        (total, item) =>
          total + parseFloat(item.product.price.amount) * item.quantity,
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
    this.cartState = {
      items: updatedItems,
      totalPrice: newTotalPrice,
    }
  }

  add(product: Product, quantity: number = 1): void {
    const updatedItems: CartItem[] = [...this.cartState.items]
    const existingItemIndex = updatedItems.findIndex(
      (item) => item.product.id === product.id
    )

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity = quantity
    } else {
      updatedItems.push({
        product,
        quantity,
      })
    }
    this.updateState(updatedItems)
  }

  remove(productId: string): void {
    const items: CartItem[] = this.cartState.items
    const updatedItems: CartItem[] = items.filter(
      (item) => item.product.id !== productId
    )

    this.updateState(updatedItems)
  }
  getState(): CartState {
    return { ...this.cartState }
  }
}
