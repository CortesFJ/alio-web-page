import { CartState } from "@/core/cart/cart"
import { CartService } from "@/core/cart/cart-service"
import mockedProduct from "../../../mocks/core/product"

describe("CartService", () => {
  let cart = new CartService()
  const defaultCurrency = "COP"
  const defaultCartState = cart.getState()

  mockedProduct.price.currency = defaultCurrency

  beforeEach(() => {
    cart = new CartService()
  })

  const CartStateWhitOneProduct: CartState = {
    items: [
      {
        product: mockedProduct,
        quantity: 1,
      },
    ],
    totalPrice: mockedProduct.price,
  }

  it("adds the mocked product to the cart", () => {
    cart.add(mockedProduct)
    expect(cart.getState()).toEqual(CartStateWhitOneProduct)
  })

  it("removes the mocked product from the cart", () => {
    const newQuantity = 5
    cart.add(mockedProduct, newQuantity)
    cart.remove(mockedProduct.id)
    expect(cart.getState()).toEqual(defaultCartState)
  })

  it("updates the quantity of a product in the cart", () => {
    const newQuantity = 5
    cart.add(mockedProduct, newQuantity)
    const expectedUpdatedCartState: CartState = {
      items: [
        {
          product: mockedProduct,
          quantity: newQuantity,
        },
      ],
      totalPrice: {
        currency: mockedProduct.price.currency,
        amount: (parseFloat(mockedProduct.price.amount) * newQuantity).toFixed(
          2
        ),
      },
    }
    expect(cart.getState()).toEqual(expectedUpdatedCartState)
  })

  it("emits the 'change' event when a product is added", (done) => {
    const changeSpy = jest.fn()
    cart.on("change", changeSpy)

    cart.add(mockedProduct)

    expect(changeSpy).toHaveBeenCalledTimes(1)
    expect(cart.getState()).toEqual(CartStateWhitOneProduct)
    done()
  })

  it("emits the 'change' event when a product is removed", (done) => {
    const changeSpy = jest.fn()
    cart.on("change", changeSpy)

    cart.add(mockedProduct)
    cart.remove(mockedProduct.id)

    expect(changeSpy).toHaveBeenCalledTimes(2) // Once for adding, once for removing
    expect(cart.getState()).toEqual(defaultCartState)
    done()
  })

  it("emits the 'change' event when the quantity of a product is updated", (done) => {
    const changeSpy = jest.fn()
    cart.on("change", changeSpy)

    const newQuantity = 5
    cart.add(mockedProduct, newQuantity)

    const expectedUpdatedCartState: CartState = {
      items: [
        {
          product: mockedProduct,
          quantity: newQuantity,
        },
      ],
      totalPrice: {
        currency: mockedProduct.price.currency,
        amount: (parseFloat(mockedProduct.price.amount) * newQuantity).toFixed(
          2
        ),
      },
    }
    expect(changeSpy).toHaveBeenCalledTimes(1)
    expect(cart.getState()).toEqual(expectedUpdatedCartState)
    done()
  })
})
