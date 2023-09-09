"use client"
import { Product } from "@/core/product-repository/domain/product"
import { useEffect, useState } from "react"
import VariantSelection from "./variant-selection"
import mockedProduct from "../../../testing/mocks/mocked-product"

interface productDetailProps {
  product: Product
  defaultVariants: Record<string, string> | null
}

const ProductDetail: React.FC<productDetailProps> = ({
  product = mockedProduct, // default values just for testing purposes.
  defaultVariants = { Size: "Small", Color: "Red" },
}) => {
  const defaultPrice = product.price?.amount ?? null

  const [price, setPrice] = useState(defaultPrice)
  const [stock, setStock] = useState(NaN)
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({})

  const updatePriceAndStock = (
    stockDetail: any,
    selectedVariants: Record<string, string>
  ) => {
    const findPriceAndStock = (detail: any) => {
      for (const variantName of Object.keys(selectedVariants)) {
        if (detail[variantName]) {
          const selectedOption = selectedVariants[variantName]
          const deeperStockDetail = detail[variantName][selectedOption]
          if (deeperStockDetail.price) {
            setPrice(deeperStockDetail.price.amount)
            setStock(deeperStockDetail.availability)
            return
          }
          findPriceAndStock(deeperStockDetail)
        }
      }
    }
    findPriceAndStock(stockDetail)
  }

  const setVariant = ({ name, option }: Record<string, string>) => {
    const newSelectedVariants = { ...selectedVariants, [name]: option }
    setSelectedVariants(newSelectedVariants)
    updatePriceAndStock(product.stock, newSelectedVariants)
  }

  useEffect(() => {
    if (defaultVariants) {
      setSelectedVariants(defaultVariants)
      updatePriceAndStock(product.stock, defaultVariants)
    }
  }, [])

  return (
    <div>
      <h1 role="heading" aria-level={1}>
        {product.name}
      </h1>
      <p>{product.description}</p>
      <p>Price: ${price}</p>
      <p>In Stock: {stock}</p>
      <img src={product.imageUrl} alt={product.name} />
      <VariantSelection
        variants={product.variants}
        manageSelectedOption={{ selectedVariants, setVariant }}
      />
    </div>
  )
}

export default ProductDetail
