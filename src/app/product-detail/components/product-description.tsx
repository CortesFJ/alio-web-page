import { Product } from "@/core/product-repository/product"
import Carousel from "./carousel"
import { updateCurrency } from "@/app/hooks/update-currency"

const ProductDescription = ({ product }: { product: Product }) => {
  const { newCurrency, newAmount } = updateCurrency(product.price)

  return (
    <article>
      <h1 role="heading" aria-level={1}>
        {product.name}
      </h1>
      <div className="  flex justify-center ">
        <Carousel imageUrls={product.imageUrls} />
      </div>
      <section>
        <p>{product.description}</p>
        <p>
          Price: {newCurrency.symbol}
          {newAmount.toFixed(2)}
        </p>
        <p>In Stock: {product.stock}</p>
      </section>
    </article>
  )
}

export default ProductDescription
