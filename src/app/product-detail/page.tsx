"use client"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Product, Variants } from "@/types"
import ProductDescription from "./components/product-description"
import VariantSelection from "./components/variant-selection"
import cartService from "@/core/cart/application/cart-service"
import mockedProduct, {
  mockedProducts,
} from "../../../testing/mocks/core/product"

const haveSameData = (obj1: Variants, obj2: Variants) =>
  Object.keys(obj1).every(
    (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
  )

interface productDetailProps {
  products: Product[]
  searchParams: {}
}
const ProductDetail: React.FC<productDetailProps> = ({
  products = [...mockedProducts, mockedProduct], // default values just for testing purposes.
  searchParams,
}) => {
  const [currentProduct, setCurrentProduct] = useState<Product>()
  const [possibleOptions, setPossibleOptions] = useState({})
  const pathname = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  function setDefaultProduct() {
    const variants = Object.entries(products[0].variants)

    variants.forEach(([vName, option]) => {
      params.set(vName, option)
    })

    replace(`${pathname}?${params.toString()}`)
  }

  function updateProductInfo(variants: Variants) {
    const selectedProduct = products.filter((product) =>
      haveSameData(product.variants, variants)
    )

    if (selectedProduct.length) {
      setCurrentProduct(selectedProduct[0])
      return true
    } else return false
  }

  function updateCurrentOptions(variants: Variants) {
    const possibleOptions: Record<string, string[]> = {}
    const mainVariantName = Object.keys(products[0].variants)[0]
    const selectedMainVariant = variants[mainVariantName]
    const variantsList = products.map((p) => p.variants)
    const changedVariants: Record<string, string> = {}

    variantsList
      .filter((variants) => variants[mainVariantName] === selectedMainVariant)
      .forEach((variants) => {
        const vNames = Object.keys(variants)

        vNames.forEach((vName) => {
          if (vName === mainVariantName) {
            return
          }

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

    Object.entries(variants).forEach(([vName, option]) => {
      if (!(vName in possibleOptions)) {
        return
      }

      if (!possibleOptions[vName].includes(option)) {
        changedVariants[vName] = possibleOptions[vName][0]
      }
    })

    return { possibleOptions, changedVariants }
  }

  useEffect(() => {
    const { possibleOptions, changedVariants } =
      updateCurrentOptions(searchParams)

    const newVariantsList = Object.entries(changedVariants)

    if (newVariantsList.length) {
      newVariantsList.forEach(([vName, option]) => {
        params.set(vName, option)
      })

      replace(`${pathname}?${params.toString()}`)
    } else {
      const updatedProduct = updateProductInfo(searchParams)

      if (updatedProduct) {
        setPossibleOptions(possibleOptions)
      } else {
        setDefaultProduct()
      }
    }
  }, [searchParams])

  return (
    <>
      {currentProduct ? (
        <div className="border border-red-600  m-4">
          <ProductDescription product={currentProduct} />
          <VariantSelection
            variantsList={products.map((p) => p.variants)}
            possibleOptions={possibleOptions}
          />
          {/* <button onClick={() => buyProduct(product)}>Buy</button> */}
          <button onClick={() => cartService.add(currentProduct)}>
            Add to Cart
          </button>
        </div>
      ) : null}
    </>
  )
}

export default ProductDetail
