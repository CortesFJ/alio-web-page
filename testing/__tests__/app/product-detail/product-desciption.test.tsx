import { render, screen } from "@testing-library/react"

import ProductDescription from "@/app/product-detail/components/product-description"
import mockedProduct from "../../../mocks/core/product"
import mockRouter from "next-router-mock"

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"))
jest.mock("@/app/product-detail/components/carousel")

describe("Product Detail Page", () => {
  mockRouter.push("/product-detail")

  const renderProductDescription = () =>
    render(<ProductDescription product={mockedProduct} />)

  it("displays the product name", () => {
    renderProductDescription()
    const productNameElement = screen.getByRole("heading", {
      name: "Sample Product",
    })
    expect(productNameElement).toBeInTheDocument()
  })

  it("displays the product description", () => {
    renderProductDescription()
    const productDescriptionElement = screen.getByText(
      /This is a sample product description/i
    )
    expect(productDescriptionElement).toBeInTheDocument()
  })

  it("displays the product price", () => {
    renderProductDescription()
    const price =parseFloat(mockedProduct.price.amount)
    const productPriceElement = screen.getByText(`Price: $${price.toFixed(2)}`)
    expect(productPriceElement).toBeInTheDocument()
  })

  it("displays the availability status", () => {
    renderProductDescription()
    const stock = mockedProduct.stock
    const availabilityStatusElement = screen.getByText(`In Stock: ${stock}`)
    expect(availabilityStatusElement).toBeInTheDocument()
  })
})
