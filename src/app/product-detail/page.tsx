"use client"
import { ProductSet } from "./product-set"
import { useEffect, useState } from "react"
import VariantSelection from "./variant-selection"
import mockedProductSet from "../../../testing/mocks/app/mocked-product-set"

interface productDetailProps {
  product: ProductSet
  defaultVariants: Record<string, string> | null
}

const ProductDetail: React.FC<productDetailProps> = ({
  product = mockedProductSet, // default values just for testing purposes.
  defaultVariants = { Size: "Small", Color: "Red" },
}) => {
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [imagesUrl, setImagesUrl] = useState("")
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({})

  const updateDisplayedVariant = (
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
            setImagesUrl(deeperStockDetail.imagesUrl)
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
    updateDisplayedVariant(product.stockInfo, newSelectedVariants)
  }

  useEffect(() => {
    if (defaultVariants) {
      setSelectedVariants(defaultVariants)
      updateDisplayedVariant(product.stockInfo, defaultVariants)
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
      <img src={imagesUrl} alt={product.name} />
      <VariantSelection
        variants={product.variants}
        manageSelectedOption={{ selectedVariants, setVariant }}
      />
    </div>
  )
}

export default ProductDetail
