import { Cart, CartState } from "@/core/cart/domain/cart"
import { CartService } from "@/core/cart/application/cart-service"
import mockedProduct from "../../../mocks/core/product"

describe("CartService", () => {
  let cart: Cart
  let mockCartState: CartState

  beforeEach(() => {
    cart = new CartService()
    mockCartState = {
      items: [],
      totalPrice: { currency: "USD", amount: "0.00" },
    }
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
    expect(cart.getState()).toEqual(mockCartState)
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
})
