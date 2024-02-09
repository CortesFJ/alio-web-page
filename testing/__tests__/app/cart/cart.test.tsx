import CartView from "@/app/cart/page"
import cartService from "@/core/cart/cart-service"
import { render, screen, fireEvent } from "@testing-library/react"
import { mockedProducts } from "../../../mocks/core/product"
import { act } from "react-dom/test-utils"

describe("CartView component", () => {
  afterEach(() => {
    act(() => {
      cartService.clear()
    })
  })

  test("cartService.getState should be called on initialization", () => {
    jest.spyOn(cartService, "getState")
    render(<CartView />)

    expect(cartService.getState).toHaveBeenCalled()
  })

  test("the cart state should be rendered", () => {
    cartService.add(mockedProducts[0])
    cartService.add(mockedProducts[1])

    const { totalPrice } = cartService.getState()

    render(<CartView />)

    expect(screen.getByText(mockedProducts[0].name))
    expect(screen.getByText(mockedProducts[1].name))
    expect(
      screen.getByText(`Total: ${totalPrice.currency} ${totalPrice.amount}`)
    )
  })

  test("products in cart can be removed", async () => {
    cartService.add(mockedProducts[0])
    cartService.add(mockedProducts[1])
    cartService.add(mockedProducts[2])

    const initialCartItems = cartService.getState().items.length

    render(<CartView />)

    expect(screen.queryByText(mockedProducts[0].name))
    const firstRemoveButton = screen.getByTestId(
      `remove_${mockedProducts[0].id}`
    )

    fireEvent.click(firstRemoveButton)

    expect(cartService.getState().items.length).toBe(initialCartItems - 1)
    expect(screen.queryByText(mockedProducts[0].name)).not.toBeInTheDocument()
  })

  test("name and total price for every product is displayed", () => {
    cartService.add(mockedProducts[0], 3)
    cartService.add(mockedProducts[1])

    render(<CartView />)

    const { totalPrice } = cartService.getState()

    expect(screen.getByText(mockedProducts[0].name)).toBeInTheDocument()
    expect(screen.getByText(mockedProducts[1].name)).toBeInTheDocument()

    const expectedPrice1 = (
      parseFloat(mockedProducts[0].price.amount) * 3
    ).toFixed(2)
    const expectedPrice2 = (
      parseFloat(mockedProducts[0].price.amount) * 3
    ).toFixed(2)

    expect(screen.getByText(`$ ${expectedPrice1}`)).toBeInTheDocument()

    expect(screen.getByText(`$ ${expectedPrice2}`)).toBeInTheDocument()
  })


  test("Display a clear message when the cart is empty", () => {
    render(<CartView />)

    const emptyCartMessage = screen.getByText(/Your cart is empty/i)
    expect(emptyCartMessage).toBeInTheDocument()

    expect(screen.queryByRole("list")).not.toBeInTheDocument()
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    expect(screen.queryByText(/Total/i)).not.toBeInTheDocument()
  })

  test("When the cart is empty, display a message and a call to action in a button", () => {
    render(<CartView />)

    expect(screen.queryByRole("list")).not.toBeInTheDocument()
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument()
    const goToShopButton = screen.getByRole("link", { name: /Go to shop/i })
    expect(goToShopButton).toBeInTheDocument()
  })
  test("The name of every product should be a link to the store", () => {
    cartService.add(mockedProducts[0])

    render(<CartView />)

    const productLink = screen.getByRole("link", {
      name: mockedProducts[0].name,
    })

    Object.values(mockedProducts[0].variants).forEach((option) => {
      const regex = new RegExp(`.*product-detail.*${option}.*`)
      expect(productLink).toHaveAttribute("href", expect.stringMatching(regex))
    })
  })

  test("A link to continue the purchase is displayed", () => {
    cartService.add(mockedProducts[0])

    render(<CartView />)

    const continueLink = screen.getByRole("link", {
      name: /Continue purchase/i,
    })
    expect(continueLink).toBeInTheDocument()
    expect(continueLink).toHaveAttribute(
      "href",
      expect.stringMatching("purchase-order")
    )
  })
})
