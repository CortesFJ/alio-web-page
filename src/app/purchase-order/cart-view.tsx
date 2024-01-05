"use client"

import { useState, useEffect } from "react"
import cartService from "@/core/cart/cart-service"
import { CartState } from "@/core/cart/cart"
import { Product } from "@/core/product-repository/product"

const CartView = () => {
  const [cartState, setCartState] = useState<CartState>(cartService.getState())

  useEffect(() => {
    const handleCartChange = () => {
      setCartState(cartService.getState())
    }

    cartService.on("change", handleCartChange)

    return () => cartService.off("change", handleCartChange)
  }, [])

  const handleQuantityChange = (product: Product, quantity: number) => {
    cartService.add(product, quantity)
  }

  return (
    <>
      <h2>Cart Summary</h2>
      <ul>
        {cartState.items.map((item) => (
          <li key={item.product.id} >
            <div>
            <p>{item.product.name}</p>
              <label htmlFor={`units-item ${item.product.id}`}>Units</label>
              <input
                id={`units-item ${item.product.id}`}
                type="number"
                min={1}
                role="spinbutton"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.product, Number(e.target.value))
                }
              />
            </div>
            <button onClick={() => cartService.remove(item.product.id)}>
              remove
            </button>
          </li>
        ))}
      </ul>
      <p>
        Total: {cartState.totalPrice.currency} {cartState.totalPrice.amount}
      </p>
    </>
  )
}

export default CartView
