"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import { Store, Plus, Minus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

import cartService from "@/core/cart/cart-service"
import { CartState } from "@/core/cart/cart"
import { Product, Variants } from "@/core/product-repository/product"
import { updateCurrency } from "../hooks/update-currency"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const EmptyCart = () => (
  <div>
    <div className="h-44">
      <p>Your cart is empty.</p>
    </div>
    <Link href="/product-detail">
      <Button>
        <Store className="mr-2 h-4 w-4" />
        Go to shop
      </Button>
    </Link>
  </div>
)

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
    <div className=" flex h-full items-center justify-center">
      {cartState.items.length === 0 ? (
        <EmptyCart />
      ) : (
        <article className=" shadow shadow-white   text-center ">
          <header className="my-6">
            <h2>Shopping Cart</h2>
          </header>
          <ScrollArea className="h-[400px]">
            {cartState.items.map((item) => {
              const { newAmount, newCurrency } = updateCurrency(
                item.product.price
              )

              return (
                <div key={item.product.id}>
                  <article className="">
                    <div className="flex ">
                      <Image
                        className="rounded"
                        src={item.product.imageUrls[0]}
                        alt={`image for ${item.product.name}`}
                        height={80}
                        width={80}
                      />
                      <div className="flex">
                        <header className=" text-left mx-4 ">
                          <h3>
                            <Link href={createUrlPath(item.product.variants)}>
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className=" text-muted text-sm ">
                            {Object.values(item.product.variants).map((v) => (
                              <span key={v}>{v} </span>
                            ))}
                          </p>
                        </header>
                        <section className="flex flex-col justify-between gap-8 ">
                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                cartService.remove(item.product.id)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="mb-2">
                            <p className="mb-2 text-left">{`${newCurrency.symbol} ${(
                              newAmount * item.quantity
                            ).toFixed(2)}`}</p>
                            <div className="flex h-8 ">
                              <button
                                className="bg-secondary px-1 rounded-l"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product,
                                    item.quantity - 1
                                  )
                                }
                              >
                                <Minus className="mx-auto h-4" />
                              </button>
                              <input
                                className="bg-secondary w-6 text-center "
                                type="text"
                                readOnly
                                value={item.quantity}
                              />
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product,
                                    item.quantity + 1
                                  )
                                }
                                className="bg-secondary px-1 rounded-r"
                              >
                                <Plus className="mx-auto h-4" />
                              </button>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                    <Separator />
                  </article>
                </div>
              )
            })}
          </ScrollArea>
          <div>
            <p>
              Total: {cartState.totalPrice.currency}{" "}
              {cartState.totalPrice.amount}
            </p>
            <Link href={"/purchase-order"}>continue purchase</Link>
          </div>
        </article>
      )}
    </div>
  )
}

export default CartView
