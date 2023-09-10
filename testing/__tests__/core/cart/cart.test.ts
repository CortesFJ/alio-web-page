import { Cart, CartState } from "@/core/cart/domain/cart"
import { CartService } from "@/core/cart/application/cart-service"
import mockedProduct from "../../../mocks/core/product"

describe("CartService", () => {
  let cartService: Cart
  let mockCartState: CartState

  beforeEach(() => {
    cartService = new CartService()
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
    cartService.add(mockedProduct)
    expect(cartService.getState()).toEqual(CartStateWhitOneProduct)
  })

  it("removes the mocked product from the cart", () => {
    const newQuantity = 5
    cartService.add(mockedProduct, newQuantity)
    cartService.remove(mockedProduct.id)
    expect(cartService.getState()).toEqual(mockCartState)
  })

  it("updates the quantity of a product in the cart", () => {
    const newQuantity = 5
    cartService.add(mockedProduct, newQuantity)
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
    expect(cartService.getState()).toEqual(expectedUpdatedCartState)
  })
})
