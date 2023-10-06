import { render, screen } from "@testing-library/react"

import ProductDetail from "@/app/product-detail/page"
import mockedProduct from "../../../mocks/core/product"
import mockRouter from "next-router-mock"

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"))

describe("Product Detail Page", () => {
  mockRouter.push("/product-detail")

  const renderProductDetail = () =>
    render(<ProductDetail products={[mockedProduct]} />)

  it("displays the product name", () => {
    renderProductDetail()
    const productNameElement = screen.getByRole("heading", {
      name: "Sample Product",
    })
    expect(productNameElement).toBeInTheDocument()
  })

  it("displays the product description", () => {
    renderProductDetail()
    const productDescriptionElement = screen.getByText(
      /This is a sample product description/i
    )
    expect(productDescriptionElement).toBeInTheDocument()
  })

  it("displays the product price", () => {
    renderProductDetail()
    const price = mockedProduct.price.amount
    const productPriceElement = screen.getByText(`Price: $${price}`)
    expect(productPriceElement).toBeInTheDocument()
  })

  it("displays the availability status", () => {
    renderProductDetail()
    const stock = mockedProduct.stock
    const availabilityStatusElement = screen.getByText(`In Stock: ${stock}`)
    expect(availabilityStatusElement).toBeInTheDocument()
  })
})
