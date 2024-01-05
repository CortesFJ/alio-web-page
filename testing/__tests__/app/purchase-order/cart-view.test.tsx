import CartView from "@/app/purchase-order/cart-view"
import cartService from "@/core/cart/cart-service"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
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

    expect(cartService.getState).toBeCalled()
  })

  test("the cart state should be rendered", () => {
    cartService.add(mockedProducts[0])
    cartService.add(mockedProducts[1])

    const { totalPrice } = cartService.getState()

    render(<CartView />)

    expect(screen.getByText("Cart Summary"))
    expect(screen.getByRole("list"))
    expect(screen.getByText(mockedProducts[0].name))
    expect(screen.getByText(mockedProducts[1].name))
    expect(
      screen.getByText(`Total: ${totalPrice.currency} ${totalPrice.amount}`)
    )
  })

  test("the quantity of each product in cart can be modified", () => {
    cartService.add(mockedProducts[0])
    cartService.add(mockedProducts[1], 2)

    const { totalPrice: totalPrice1 } = cartService.getState()

    render(<CartView />)

    expect(
      screen.getByText(`Total: ${totalPrice1.currency} ${totalPrice1.amount}`)
    ).toBeInTheDocument()

    const quantityInputs = screen.getAllByRole("spinbutton")
    const firstQuantityInput = quantityInputs[0] as HTMLInputElement
    fireEvent.change(firstQuantityInput, { target: { value: 3 } })
    const secondQuantityInput = quantityInputs[1] as HTMLInputElement
    fireEvent.change(secondQuantityInput, { target: { value: 1 } })

    const { totalPrice: totalPrice2 } = cartService.getState()

    expect(cartService.getState().items[0].quantity).toBe(3)
    expect(cartService.getState().items[1].quantity).toBe(1)

    expect(totalPrice1).not.toBe(totalPrice2)
    expect(
      screen.getByText(`Total: ${totalPrice2.currency} ${totalPrice2.amount}`)
    ).toBeInTheDocument()
  })

  test("products in cart can be removed", async () => {
    cartService.add(mockedProducts[0])
    cartService.add(mockedProducts[1])
    cartService.add(mockedProducts[2])

    const initialCartItems = cartService.getState().items.length

    render(<CartView />)

    expect(screen.queryByText(mockedProducts[0].name))
    const removeButtons = screen.getAllByRole("button", { name: /remove/i })
    const firstRemoveButton = removeButtons[0]

    fireEvent.click(firstRemoveButton)

    expect(cartService.getState().items.length).toBe(initialCartItems - 1)
    expect(screen.queryByText(mockedProducts[0].name)).not.toBeInTheDocument()
  })

  // test("products in cart can be removed", () => {

  // })
})
