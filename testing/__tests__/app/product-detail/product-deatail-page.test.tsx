import ProductDetail, { exportToTest } from "@/app/product-detail/page"
import { mockedWallets } from "../../../mocks/core/product"
import { render, screen } from "@testing-library/react"
import { stringify } from "querystring"
import mockRouter from "next-router-mock"
import VariantSelection from "@/app/product-detail/components/variant-selection"
import ProductDescription from "@/app/product-detail/components/product-description"

const { updateOptions } = exportToTest

const replace = jest.fn()
jest.mock("next/navigation", () => ({
  // ...require('next-router-mock'),
  // useSearchParams: () => jest.fn(),
  // useParams: () => jest.fn(),
  usePathname: jest.fn(() => "initial/pathname"),
  useRouter: jest.fn(() => ({ replace })),
}))
// Mock the VariantSelection component
jest.mock("@/app/product-detail/components/variant-selection", () => {
  return jest
    .fn
    //   (props) => (
    //   <div data-testid="mocked-variant-selection">
    //     {/* Mocked implementation */}
    //   </div>
    // )
    ()
})
jest.mock("@/app/product-detail/components/product-description", () => {
  return jest
    .fn
    //   (props) => (
    //   <div data-testid="mocked-variant-selection">
    //     {/* Mocked implementation */}
    //   </div>
    // )
    ()
})

describe("Product Detail Page", () => {
  const defaultProduct = mockedWallets[0]
  const defaultVariants = defaultProduct.variants
  const queryString = stringify(defaultVariants)

  test("if not searchParams, should set searchParams for the first product", () => {
    render(
      <ProductDetail
        products={mockedWallets}
        searchParams={{}}
        updateCurrentOptions={updateOptions}
      />
    )
    expect(replace).toBeCalledWith(expect.stringContaining(queryString))
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
    expect(replace).toBeCalledWith(expect.stringContaining(queryString))
    expect(replace).toBeCalledWith(expect.stringContaining("initial/pathname"))
  })

  test("should render the product matching whit searchParams", () => {
    const variantsList = mockedWallets.map((p) => p.variants)
    const search_params1 = { Color: "Brown", Material: "Leather" }
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
      expect.objectContaining({ variantsList ,possibleOptions:options1.allowedOptions}),
      {}
    )

    const search_params2 = { Color: "Tan", Material: "Canvas" }
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
      expect.objectContaining({ variantsList ,possibleOptions:options2.allowedOptions}),
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
