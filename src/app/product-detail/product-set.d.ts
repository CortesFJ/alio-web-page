type Category = { category: string; subCategory: string }

type ProductId = string

type StockInfo = {
  [key: string]:
    | StockInfo
    | { availability: number; price: Price; imagesUrl: string }
}

export type ProductSet = {
  id: ProductId
  name: string
  description: string
  variants?: VariantSet[]
  category?: Category
  stockInfo: StockInfo
}

export type VariantSet = Record<string, string[]>

const variantListArray = products.map((product) => product.variants)
const variantSet: VariantSet = variantListArray.reduce((acc, variantList) => {
  variantList.forEach((variant) => {
    if (acc[variant.name]) {
      acc[variant.name] = [Set(...acc[variant.name], variant.value)]
    }
  })
  return acc
}, {})

function convertVariantsToVariantSet(products: Product[]): VariantSet {
  const variantSet = products.reduce((acc, product) => {
    if (acc[key]) {
      acc[key].push(variant.value)
    } else {
      acc[key] = [variant.value]
    }
    return acc
  }, {})
}
