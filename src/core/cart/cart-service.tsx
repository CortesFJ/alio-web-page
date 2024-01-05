import { Cart, CartState, CartItem } from "@/core/cart/cart"
import { Product, Price } from "@/core/product-repository/product"
import { EventEmitter } from "events"

export class CartService implements Cart {
  private defaultState: CartState = {
    items: [],
    totalPrice: { currency: "COP", amount: "0.00" },
  }

  private state: CartState = this.defaultState

  private emitter = new EventEmitter()

  //  TODO  manage currency transformation
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

  add(product: Product, quantity: number = 1): void {
    if (quantity <= 0 || quantity > product.stock) {
      return
    }
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
    //  TODO save cart state to localStorage
  }

  remove(productId: string): void {
    const items: CartItem[] = this.state.items
    const updatedItems: CartItem[] = items.filter(
      (item) => item.product.id !== productId
    )

    this.updateState(updatedItems)
  }

  clear(): void {
    const items: CartItem[] = []
    this.updateState(items)
  }

  getState(): CartState {
    return { ...this.state }
  }

  // Methods for event handling
  on(eventName: string, listener: (...args: any[]) => void): this {
    this.emitter.on(eventName, listener)
    return this
  }

  off(eventName: string, listener: (...args: any[]) => void): void {
    this.emitter.removeListener(eventName, listener)
    return
  }

  emit(eventName: string, ...args: any[]): boolean {
    return this.emitter.emit(eventName, ...args)
  }

  private emitChange(): void {
    this.emit("change")
  }

  private updateState(updatedItems: CartItem[]): void {
    const newTotalPrice = this.calculateTotalPrice(updatedItems)
    this.state = {
      items: updatedItems,
      totalPrice: newTotalPrice,
    }
    this.emitChange()
  }
}

export default new CartService()
