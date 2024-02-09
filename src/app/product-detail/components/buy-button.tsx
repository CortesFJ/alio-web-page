import Link from "next/link"

import { Product } from "@/core/product-repository/product"

import cartService from "@/core/cart/cart-service"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

// hook to add UX behavior on cart calls.
function useCart() {
  const service = cartService
  return service
}

interface BuyButtonProps {
  product: Product
}

const BuyButton: React.FC<BuyButtonProps> = ({ product }) => {
  const cart = useCart()
  const [update, setUpdate] = useState(0)

  function placeOrder() {
    const cartState = cart.getState()

    if (!cartState.items.some((item) => item.product.id === product.id)) {
      cart.add(product)
    }
  }
  useEffect(() => {
    const productInCart = cart
      .getState()
      .items?.filter((i) => i.product.id === product.id)
    if (productInCart.length) {
      console.log(productInCart[0].quantity)
    }
  }, [update])

  return (
    <div className="grid gap-2 p-4 ">
      <Button onClick={() => setUpdate(update + 1)}>Quantity {}</Button>
      <Button asChild className="bg-sky-300 text-accent">
        <Link href="/cart" onClick={placeOrder}>
          Buy
        </Link>
      </Button>
      <Button onClick={() => cart.add(product)}>Add to Cart</Button>
    </div>
  )
}
export default BuyButton
