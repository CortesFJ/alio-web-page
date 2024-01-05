import { Product, Price } from "@/core/product-repository/product"
import Carousel from "./carousel"

const ProductDescription = ({ product }: { product: Product }) => {
  const updateCurrency = (
    price: Price,
    newCurrency?: Record<string, string>
  ) => {
    newCurrency = { currency: "COP", symbol: "$" }
    const newAmount = price.amount

    return { newCurrency, newAmount }
  }

  const { newCurrency, newAmount } = updateCurrency(product.price)

  return (
    <article>
      <h1 role="heading" aria-level={1}>
        {product.name}
      </h1>
      <Carousel imageUrls={product.imageUrls} />
      <section>
        <p>{product.description}</p>
        <p>
          Price: {newCurrency.symbol}
          {newAmount}
        </p>
        <p>In Stock: {product.stock}</p>
      </section>
    </article>
  )
}

export default ProductDescription
