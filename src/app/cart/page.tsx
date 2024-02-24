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
  <div className="h-screen flex flex-col justify-evenly">
    <div className="">
      <p>Your cart is empty.</p>
    </div>
    <Button asChild className="mb-28">
      <Link href="/product-detail">
        <Store className="mr-2 h-4 w-4" />
        Go to shop
      </Link>
    </Button>
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
    if (quantity < 0) {
      return
    }

    if (quantity > product.stock) {
      quantity = product.stock
    }
    cartService.add(product, quantity)
  }

  return (
    <div className=" flex flex-col items-center justify-between">
      {cartState.items.length === 0 ? (
        <EmptyCart />
      ) : (
        <article className="text-center min-h-[calc(100vh-4rem)] ">
          <header className="mt-8 mb-12">
            <h2>Shopping Cart</h2>
          </header>
          <ScrollArea className="h-[320px]">
            {cartState.items.map((item) => {
              const { newAmount, newCurrency } = updateCurrency(
                item.product.price
              )

              return (
                <div className="mb-2" key={item.product.id}>
                  <article className=" w-screen px-6 mb-2">
                    <header className="flex justify-between">
                      <h3 className="mb-2">
                        <Link href={createUrlPath(item.product.variants)}>
                          {item.product.name}
                        </Link>
                      </h3>
                      <Button
                        data-testid={`remove_${item.product.id}`}
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => cartService.remove(item.product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </header>
                    <div className="flex justify-between">
                      <section className=" flex">
                        <Image
                          className="rounded object-cover mr-2"
                          src={item.product.imageUrls[0]}
                          alt={`image for ${item.product.name}`}
                          height={80}
                          width={80}
                        />
                        <p className=" text-muted text-sm w-min text-left ">
                          {Object.values(item.product.variants).map((v) => {
                            if (v.startsWith("hsla(")) {
                              return
                            }

                            return <span key={v}>{v} </span>
                          })}
                        </p>
                      </section>
                      <section className="flex flex-col justify-end">
                        <p className="mb-2 text-left text-muted font-semibold">
                          Unit:
                          <span>
                            {` ${newCurrency.symbol} ${newAmount.toFixed(2)}`}
                          </span>
                        </p>
                        <p className="mb-2 text-left">
                          <span>
                            {`${newCurrency.symbol} ${(
                              newAmount * item.quantity
                            ).toFixed(2)}`}
                          </span>
                        </p>
                        <div className="flex h-8">
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
                      </section>
                    </div>
                  </article>
                  <Separator />
                </div>
              )
            })}
          </ScrollArea>
          <div className=" pt-16 mb-10 text-lg font-semibold">
            <p>
              Total: {cartState.totalPrice.currency}{" "}
              {cartState.totalPrice.amount}
            </p>
            <Button asChild className="w-full mt-8 rounded-none font-bold ">
              <Link href={"/purchase-order"}>continue purchase</Link>
            </Button>
          </div>
        </article>
      )}
    </div>
  )
}

export default CartView
