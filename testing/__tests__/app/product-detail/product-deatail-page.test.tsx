import { render, screen } from "@testing-library/react"

import ProductDetail from "@/app/product-detail/page"
import mockedProduct from "../../../mocks/app/mocked-product-set"

describe("Product Detail Page", () => {
  const renderProductDetail = () =>
    render(
      <ProductDetail
        product={mockedProduct}
        defaultVariants={{ Size: "Small", Color: "Red" }}
      />
    )

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
    const price = "20.00"
    const productPriceElement = screen.getByText(`Price: $${price}`)
    expect(productPriceElement).toBeInTheDocument()
  })

  it("displays the availability status", () => {
    renderProductDetail()
    const availabilityStatusElement = screen.getByText(/In Stock: 1/i)
    expect(availabilityStatusElement).toBeInTheDocument()
  })
})
