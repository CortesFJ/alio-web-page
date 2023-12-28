"use client"
import { useState, useEffect } from "react"

import { Product, Variants } from "@/types"

import VariantSelection from "./components/variant-selection"
import cartService from "@/core/cart/application/cart-service"
import mockedProduct, {
  mockedProducts,
} from "../../../testing/mocks/core/product"
import Carousel from "./components/carousel"

const missingProduct: Product = {
  id: "missingProduct",
  name: "Missing Product",
  description: "There is no available units of the selected product.",
  price: { currency: "USD", amount: "0.00" },
  imagesUrl: ["/missing-part-puzzle.webp"],
  variants: {
    // Size: "Small",
    // Color: "Red",
  },
  stock: 0,
}

interface productDetailProps {
  products: Product[]
}
const ProductDetail: React.FC<productDetailProps> = ({
  products = [...mockedProducts, mockedProduct], // default values just for testing purposes.
}) => {
  const [currentProduct, setCurrentProduct] = useState(products[0])
  const [currentOptions, setCurrentOptions] = useState({
    selectedVariants: products[0].variants,
    possibleOptions: updateCurrentOptions(products[0].variants).possibleOptions,
  })

  function updateCurrentOptions(selectedVariants: Variants) {
    const mainVariantName = Object.keys(products[0].variants)[0]
    const selectedMainVariant = selectedVariants[mainVariantName]
    const possibleOptions: Record<string, string[]> = {}
    const variantsList = products.map((p) => p.variants)

    variantsList
      .filter((variants) => variants[mainVariantName] === selectedMainVariant)
      .forEach((variants) => {
        const vNames = Object.keys(variants)

        vNames.forEach((vName) => {
          // if (vName === mainVariantName) {
          //   return
          // }

          if (vName in possibleOptions) {
            possibleOptions[vName] = [
              ...possibleOptions[vName],
              variants[vName],
            ]
          } else {
            possibleOptions[vName] = [variants[vName]]
          }
        })
      })

    Object.entries(selectedVariants).forEach(([vName, option]) => {
      if (!(vName in possibleOptions)) {
        return
      }

      if (!possibleOptions[vName].includes(option)) {
        selectedVariants[vName] = possibleOptions[vName][0]
      }
    })

    return { selectedVariants, possibleOptions }
  }

  const haveSameData = (obj1: Variants, obj2: Variants) =>
    Object.keys(obj1).every(
      (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
    )

  const updateProductInfo = (newSelectedVariants: Variants) => {
    const selectedProduct = products.filter((product) =>
      haveSameData(product.variants, newSelectedVariants)
    )

    selectedProduct.length === 1
      ? setCurrentProduct(selectedProduct[0])
      : setCurrentProduct(missingProduct)
  }

  const setVariant = ({ vName, option }: Record<string, string>) => {
    const newSelectedVariants: Variants = {
      ...currentOptions.selectedVariants,
      [vName]: option,
    }

    setCurrentOptions(updateCurrentOptions(newSelectedVariants))
    updateProductInfo(newSelectedVariants)
  }

  return (
    <div className="border border-red-600  m-4">
      <h1 role="heading" aria-level={1}>
        {currentProduct.name}
      </h1>
      <Carousel imageUrls={currentProduct.imagesUrl} />
      {/* <img src={} alt={currentProduct.name} /> */}
      <p>{currentProduct.description}</p>
      <p>Price: ${currentProduct.price.amount}</p>
      <p>In Stock: {currentProduct.stock}</p>
      <VariantSelection
        variantsList={products.map((p) => p.variants)}
        manageState={{ ...currentOptions, setVariant }}
      />
      {/* <button onClick={() => buyProduct(product)}>Buy</button> */}
      <button onClick={() => cartService.add(currentProduct)}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductDetail
