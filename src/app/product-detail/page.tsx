"use client"
import { Product, Variants } from "@/types"
import { useState } from "react"
import VariantSelection from "./variant-selection"
import mockedProduct from "../../../testing/mocks/core/product"

export type VariantsDict = Record<string, string[]>

interface productDetailProps {
  products: Product[]
}

const ProductDetail: React.FC<productDetailProps> = ({
  products = [mockedProduct], // default values just for testing purposes.
}) => {
  const [currentProduct, setCurrentProduct] = useState(products[0])
  const [selectedVariants, setSelectedVariants] = useState(
    currentProduct.variants
  )

  const allVariants = products.reduce<VariantsDict>((acc, product) => {
    for (const [variantName, value] of Object.entries(product.variants || {})) {
      if (!acc[variantName]) {
        acc[variantName] = [value]
      } else {
        acc[variantName].push(value)
      }
    }
    return acc
  }, {})

  const haveSameData = (obj1, obj2) => {
    const obj1Length = Object.keys(obj1).length
    const obj2Length = Object.keys(obj2).length

    if (obj1Length === obj2Length) {
      return Object.keys(obj1).every(
        (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
      )
    }
    return false
  }

  const updateProductInfo = (newSelectedVariants: Variants) => {
    const selectedProduct = products.filter((product) =>
      haveSameData(product.variants, newSelectedVariants)
    )
    if (selectedProduct.length !== 1) {
      console.error(
        "The product compatible with the selected variants could not be identified"
      )
      setSelectedVariants(currentProduct.variants)
      return
    }

    setCurrentProduct(selectedProduct[0])
  }

  const setVariant = ({ name, option }: Record<string, string>) => {
    const newSelectedVariants: Variants = {
      ...selectedVariants,
      [name]: option,
    }
    setSelectedVariants(newSelectedVariants)
    updateProductInfo(newSelectedVariants)
  }

  return (
    <div>
      <h1 role="heading" aria-level={1}>
        {currentProduct.name}
      </h1>
      <img src={currentProduct.imagesUrl} alt={currentProduct.name} />
      <p>{currentProduct.description}</p>
      <p>Price: ${currentProduct.price.amount}</p>
      <p>In Stock: {currentProduct.stock}</p>
      <VariantSelection
        variants={allVariants}
        manageSelectedOption={{ selectedVariants, setVariant }}
      />
      {/* <button onClick={() => buyProduct(product)}>Buy</button> */}
      {/* <button onClick={() => addToCart(product)}>Add to Cart</button> */}
    </div>
  )
}

export default ProductDetail
