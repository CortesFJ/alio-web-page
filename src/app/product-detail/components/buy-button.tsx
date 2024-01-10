import Link from "next/link"

import { Product } from "@/core/product-repository/product"

import cartService from "@/core/cart/cart-service"

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

  function placeOrder() {
    const cartState = cart.getState()

    if (!cartState.items.some((item) => item.product.id === product.id)) {
      cart.add(product)
    }
  }
  return (
    <div className=" p-4 flex gap-2">
      <button onClick={() => cart.add(product)}>Add to Cart</button>
      <Link href="/cart" onClick={placeOrder}>
        <button>Buy</button>
      </Link>
    </div>
  )
}
export default BuyButton
