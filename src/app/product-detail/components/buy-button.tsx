import Link from "next/link"

import { Product } from "@/types"
import { Cart } from "@/core/cart/domain/cart"

import cartService from "@/core/cart/application/cart-service"

function useCart() {
  const service: Cart = cartService // Use the Cart interface

  return service
}

interface BuyButtonProps {
  product: Product
}

const BuyButton: React.FC<BuyButtonProps> = ({ product }) => {
  const cart = useCart()

  function placeOrder() {
    const cartState = cart.getState()

    if (!cartState.items.some((item) => item.product.id === product.id)) {
      cart.add(product)
    }
  }
  return (
    <div className=" p-4 flex gap-2">
      <button onClick={() => cart.add(product)}>Add to Cart</button>
      <Link href="/purchaseOrder" onClick={placeOrder}>
        <button>Buy</button>
      </Link>
    </div>
  )
}
export default BuyButton
