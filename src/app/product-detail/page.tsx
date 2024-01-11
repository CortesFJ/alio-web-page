"use client"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Product, Variants } from "@/core/product-repository/product"
import ProductDescription from "./components/product-description"
import VariantSelection from "./components/variant-selection"
import mockedProduct, {
  mockedProducts,
} from "../../../testing/mocks/core/product"
import BuyButton from "./components/buy-button"

const haveSameData = (obj1: Variants, obj2: Variants) =>
  Object.keys(obj1).every(
    (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
  )

function updateOptions(
  selectedVariants: Variants,
  products: Product[]
): { allowedOptions: any; changedVariants: any } {
  const mainVariantName = Object.keys(products[0].variants)[0]
  const selectedMainVariant = selectedVariants[mainVariantName]
  const allowedOptions: Record<string, string[]> = {}
  const variantsList = products.map((p) => p.variants)
  //update possible options
  variantsList
    .filter((variants) => variants[mainVariantName] === selectedMainVariant)
    .forEach((variants) => {
      const vNames = Object.keys(variants)

      vNames.forEach((vName) => {
        if (vName === mainVariantName) {
          return
        }

        if (vName in allowedOptions) {
          allowedOptions[vName] = [...allowedOptions[vName], variants[vName]]
        } else {
          allowedOptions[vName] = [variants[vName]]
        }
      })
    })

  // get changed variants when selectedVariants are no possible
  const changedVariants: Record<string, string> = {}

  Object.entries(selectedVariants).forEach(([vName, option]) => {
    if (!Object.keys(allowedOptions).includes(vName)) {
      return
    }

    if (!allowedOptions[vName].includes(option)) {
      changedVariants[vName] = allowedOptions[vName][0]
    }
  })

  return { allowedOptions, changedVariants }
}

interface productDetailProps {
  searchParams: {}
  products?: Product[]
  updateCurrentOptions?: typeof updateOptions
}

const ProductDetail: React.FC<productDetailProps> = ({
  searchParams,
  products = [...mockedProducts, mockedProduct],
  updateCurrentOptions = updateOptions,
}) => {
  const [currentProduct, setCurrentProduct] = useState<Product>()
  const [possibleOptions, setPossibleOptions] = useState({})
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  function loadDefaultProduct() {
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

  useEffect(() => {
    const { allowedOptions, changedVariants } = updateCurrentOptions(
      searchParams,
      products
    )

    const newVariantsList: [string, string][] = Object.entries(changedVariants)

    if (newVariantsList.length) {
      newVariantsList.forEach(([vName, option]) => {
        params.set(vName, option)
      })
      replace(`${pathname}?${params.toString()}`)
    } else if (updateProductInfo(searchParams)) {
      setPossibleOptions(allowedOptions)
    } else {
      loadDefaultProduct()
    }
  }, [searchParams])

  return (
    <>
      {currentProduct ? (
        <div className="border border-red-600 m-4">
          <ProductDescription product={currentProduct} />
          <VariantSelection
            variantsList={products.map((p) => p.variants)}
            possibleOptions={possibleOptions}
          />
          <BuyButton product={currentProduct} />
        </div>
      ) : null}
    </>
  )
}

export const exportToTest = { updateOptions }
export default ProductDetail
