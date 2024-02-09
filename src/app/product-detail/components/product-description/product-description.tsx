import { Product } from "@/core/product-repository/product"
import Carousel from "./carousel"
import { updateCurrency } from "@/app/hooks/update-currency"
import { ReactNode } from "react"

const ProductDescription = ({
  product,
  children,
}: {
  product: Product
  children: ReactNode
}) => {
  const { newCurrency, newAmount } = updateCurrency(product.price)

  return (
    <article>
      <p className="flex justify-between items-baseline">
        <span className="text-3xl my-4">
          {newCurrency.symbol} {newAmount.toFixed(2)}
        </span>
        <small className="pr-4 text-muted">
          {product.stock} units in stock
        </small>
      </p>
      {children}
      <div className="pl-4 pr-10 mt-6">
        <h4>
          <strong>{product.name}</strong>
        </h4>
        <p>{product.description}</p>
      </div>
    </article>
  )
}

export default ProductDescription
