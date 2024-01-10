"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

import cartService from "@/core/cart/cart-service"
import { CartState } from "@/core/cart/cart"
import { Product, Variants } from "@/core/product-repository/product"
import { updateCurrency } from "../hooks/update-currency"

const CartView = () => {
  const [cartState, setCartState] = useState<CartState>(cartService.getState())
  const params = new URLSearchParams()

  function createUrlPath(variants: Variants): string {
    Object.entries(variants).forEach(([vName, option]) => {
      params.set(vName, option)
    })
    return `/product-detail?${params.toString()}`
  }

  useEffect(() => {
    const handleCartChange = () => {
      setCartState(cartService.getState())
    }

    cartService.on("change", handleCartChange)

    return () => cartService.off("change", handleCartChange)
  }, [])

  const handleQuantityChange = (product: Product, quantity: number) => {
    function displayQuantityLimitWarning() {
      // TODO
    }

    function displayQuantityErrorWarning() {
      // TODO
    }

    if (quantity < 0) {
      displayQuantityErrorWarning()
      return
    }

    if (quantity > product.stock) {
      displayQuantityLimitWarning()
      quantity = product.stock
    }
    cartService.add(product, quantity)
  }

  return (
    <>
      {cartState.items.length === 0 ? (
        <p>
          Your cart is empty. <button>Go to shop</button>
        </p>
      ) : (
        <>
          <h2>Cart Summary</h2>
          <ul>
            {cartState.items.map((item) => {
              const { newAmount, newCurrency } = updateCurrency(
                item.product.price
              )
              return (
                <li key={item.product.id}>
                  <div>
                    <Link href={createUrlPath(item.product.variants)}>
                      <span className="pTitle">{item.product.name}</span>
                    </Link>
                    <p>{`Unit Price: ${newCurrency.symbol} ${newAmount.toFixed(
                      2
                    )}`}</p>
                    <p>{`Total Price: ${newCurrency.symbol} ${(
                      newAmount * item.quantity
                    ).toFixed(2)}`}</p>
                    <label htmlFor={`units-item ${item.product.id}`}>
                      Units
                    </label>
                    <input
                      id={`units-item ${item.product.id}`}
                      type="number"
                      min={1}
                      max={item.product.stock}
                      role="spinbutton"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product,
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <button onClick={() => cartService.remove(item.product.id)}>
                    remove
                  </button>
                </li>
              )
            })}
          </ul>

          <div>
            <p>
              Total: {cartState.totalPrice.currency}{" "}
              {cartState.totalPrice.amount}
            </p>
            <Link href={"/purchase-order"}>continue purchase</Link>
          </div>
        </>
      )}
    </>
  )
}

export default CartView
