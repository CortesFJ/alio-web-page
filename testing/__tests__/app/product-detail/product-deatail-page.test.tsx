import ProductDetail, { exportToTest } from "@/app/product-detail/page"
import VariantSelection from "@/app/product-detail/components/variant-selection"
import ProductDescription from "@/app/product-detail/components/product-description"
import { mockedWallets } from "../../../mocks/core/product"

import { render} from "@testing-library/react"
import { stringify } from "querystring"


const { updateOptions } = exportToTest

// Mocks
const replace = jest.fn()
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "initial/pathname"),
  useRouter: jest.fn(() => ({ replace })),
}))
jest.mock("@/app/product-detail/components/variant-selection", () => jest.fn())
jest.mock("@/app/product-detail/components/product-description", () =>
  jest.fn()
)


describe("Product Detail Page", () => {
  const defaultProduct = mockedWallets[0]
  const defaultVariants = defaultProduct.variants
  const defaultQueryString = stringify(defaultVariants)
  const variantsList = mockedWallets.map((p) => p.variants)
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("if not searchParams, should set searchParams for the first product", () => {
    render(
      <ProductDetail
        products={mockedWallets}
        searchParams={{}}
        updateCurrentOptions={updateOptions}
      />
    )
    expect(replace).toBeCalledWith(expect.stringContaining(defaultQueryString))
    expect(replace).toBeCalledWith(expect.stringContaining("initial/pathname"))
  })

  test("should set updated searchParams when wrong params are provided", () => {
    render(
      <ProductDetail
        products={mockedWallets}
        searchParams={{ Color: "Brown", Material: "Canvas" }}
        updateCurrentOptions={updateOptions}
      />
    )
    expect(replace).toBeCalledWith(expect.stringContaining(defaultQueryString))
    expect(replace).toBeCalledWith(expect.stringContaining("initial/pathname"))
  })

  test("should render the product matching whit searchParams", () => {
    const search_params1 = mockedWallets[0].variants
    const options1 = updateOptions(search_params1, mockedWallets)

    render(
      <ProductDetail
        products={mockedWallets}
        searchParams={search_params1}
        updateCurrentOptions={updateOptions}
      />
    )

    expect(ProductDescription).toBeCalledTimes(1)
    expect(ProductDescription).toHaveBeenCalledWith(
      { product: mockedWallets[0] },
      {}
    )
    expect(VariantSelection).toBeCalledTimes(1)
    expect(VariantSelection).toHaveBeenCalledWith(
      expect.objectContaining({
        variantsList,
        possibleOptions: options1.allowedOptions,
      }),
      {}
    )

    const search_params2 = mockedWallets[2].variants
    const options2 = updateOptions(search_params1, mockedWallets)

    render(
      <ProductDetail
        products={mockedWallets}
        searchParams={search_params2}
        updateCurrentOptions={updateOptions}
      />
    )

    expect(ProductDescription).toBeCalledTimes(2)
    expect(ProductDescription).toHaveBeenCalledWith(
      { product: mockedWallets[2] },
      {}
    )
    expect(VariantSelection).toBeCalledTimes(2)
    expect(VariantSelection).toHaveBeenCalledWith(
      expect.objectContaining({
        variantsList,
        possibleOptions: options2.allowedOptions,
      }),
      {}
    )
  })

})

describe("updateOptions functions", () => {
  test("should filter the options by the main variable and change secondary variants if no match", () => {
    const response1 = updateOptions(
      { Color: "Blue", Material: "Stainless Steel" },
      mockedWallets
    )

    expect(response1.allowedOptions).toEqual({
      Material: expect.arrayContaining(["Recycled PET Leather", "Leather"]),
    })

    expect(response1.allowedOptions).toEqual({
      Material: expect.not.arrayContaining(["Stainless Steel"]),
    })

    expect(response1.changedVariants).toEqual({
      Material: "Recycled PET Leather",
    })

    const response2 = updateOptions(
      { Color: "Black", Material: "Stainless Steel" },
      mockedWallets
    )
    expect(response2.allowedOptions).toEqual({
      Material: expect.arrayContaining([
        "Aluminum",
        "Leather",
        "Stainless Steel",
      ]),
    })
    expect(response2.changedVariants).toEqual({})

    const response3 = updateOptions(
      { Color: "Black", Material: "Recycled PET Leather" },
      mockedWallets
    )

    expect(response3.allowedOptions).toEqual({
      Material: expect.arrayContaining([
        "Aluminum",
        "Leather",
        "Stainless Steel",
      ]),
    })
    expect(response1.changedVariants).toEqual({
      Material: "Recycled PET Leather",
    })
    expect(response3.changedVariants).toEqual({ Material: "Aluminum" })
  })
})