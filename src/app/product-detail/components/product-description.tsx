import { Product } from "@/types"
import Carousel from "./carousel"

const ProductDescription = ({ product }: { product: Product }) => {
  return (
    <article>
      <h1 role="heading" aria-level={1}>
        {product.name}
      </h1>
      <Carousel imageUrls={product.imageUrls} />
      <section>
        <p>{product.description}</p>
        <p>Price: ${product.price.amount}</p>
        <p>In Stock: {product.stock}</p>
      </section>
    </article>
  )
}

export default ProductDescription
