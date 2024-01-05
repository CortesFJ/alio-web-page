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

  test("name, unit price and total price for every product is displayed", () => {
    cartService.add(mockedProducts[0], 3)
    cartService.add(mockedProducts[1])

    render(<CartView />)

    const productItems = screen.getAllByRole("listitem")
    const firstProductItem = productItems[0]

    expect(firstProductItem).toHaveTextContent(mockedProducts[0].name)
    expect(
      screen.getByText(
        `Unit Price: $ ${parseFloat(mockedProducts[0].price.amount).toFixed(2)}`
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        `Total Price: $ ${(
          parseFloat(mockedProducts[0].price.amount) * 3
        ).toFixed(2)}`
      )
    ).toBeInTheDocument()
  })

  test("cannot load the cart with more units than those available per product", () => {
    const product = mockedProducts[0]
    const initialValue = product.stock

    cartService.add(product, initialValue)

    render(<CartView />)

    const quantityInput: HTMLElement & { value: string } =
      screen.getByRole("spinbutton")

    fireEvent.change(quantityInput, { target: { value: initialValue + 1 } })

    expect(cartService.getState().items[0].quantity).toBe(initialValue)
    expect(quantityInput.value).toBe(initialValue.toString())
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

    expect(screen.queryByRole("list")).not.toBeInTheDocument() // No cart items list
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument() // Empty message
    const goToShopButton = screen.getByRole("button", { name: /Go to shop/i })
    expect(goToShopButton).toBeInTheDocument()
  })

  // test("Display a clear message when the cart is empty", () => {

  // })
})
