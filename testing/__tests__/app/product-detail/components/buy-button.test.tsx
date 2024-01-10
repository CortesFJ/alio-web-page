import BuyButton from "@/app/product-detail/components/buy-button"
import cartService from "@/core/cart/cart-service"

import mockedProduct from "../../../../mocks/core/product"

import { render, screen, fireEvent, waitFor } from "@testing-library/react"

describe.only("BuyButton component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  jest.spyOn(cartService, "add")

  test("add product to cart if 'BuyButton' is clicked and product is not in cart ", () => {
    render(<BuyButton product={mockedProduct} />)

    fireEvent.click(screen.getByRole("button", { name: /buy/i }))

    expect(cartService.add).toHaveBeenCalledTimes(1)
    expect(cartService.add).toHaveBeenCalledWith(mockedProduct)
  })

  test("add the current product to cartService when add to cart button is clicked", () => {
    render(<BuyButton product={mockedProduct} />)

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }))

    expect(cartService.add).toHaveBeenCalledTimes(1)
    expect(cartService.add).toHaveBeenCalledWith(mockedProduct)
  })

  test("don't add product to cart if 'BuyButton' is clicked and product is in cart", () => {
    cartService.add(mockedProduct)

    render(<BuyButton product={mockedProduct} />)

    fireEvent.click(screen.getByRole("button", { name: /buy/i }))

    expect(cartService.add).toHaveBeenCalledTimes(1)
  })

  test("buy button should redirect to cart page", () => {
    render(<BuyButton product={mockedProduct} />)

    const buyButton = screen.getByRole("link", { name: /buy/i })

    expect(buyButton).toHaveAttribute("href", "/cart")
  })
})
