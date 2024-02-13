import Link from "next/link"

import { Product } from "@/core/product-repository/product"

import cartService from "@/core/cart/cart-service"
import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface BuyButtonProps {
  product: Product
}

const BuyButton: React.FC<BuyButtonProps> = ({ product }) => {
  const cart = cartService
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (Number.isNaN(quantity)) {
      setQuantity(1)
    }
    if (quantity < 1) {
      setQuantity(1)
    } else if (quantity > product.stock) {
      setQuantity(product.stock)
    }
  }, [quantity])

  return (
    <div className="grid gap-2 my-12">
      <Popover>
        <PopoverTrigger className=" bg-secondary rounded-md p-2">
          Quantity {quantity}
        </PopoverTrigger>
        <PopoverContent className="grid gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <Button onClick={() => setQuantity(n)} key={n}>
              {n} units
            </Button>
          ))}
          <Input
            type="number"
            placeholder={`more than 5   (${product.stock} available)`}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min={1}
            max={product.stock}
          />
        </PopoverContent>
      </Popover>
      <Button asChild className="bg-sky-300 text-accent">
        <Link href="/cart" onClick={() => cart.add(product, quantity)}>
          Buy
        </Link>
      </Button>
      <Button onClick={() => cart.add(product, quantity)}>Add to Cart</Button>
    </div>
  )
}
export default BuyButton
