import { Product } from "@/types"

const mockedProduct: Product = {
  id: "1",
  name: "Sample Product",
  description: "This is a sample product description.",
  price: { currency: "USD", amount: "23.00" },
  imagesUrl: [
    "/cafe-01.jpeg",
    "/cafe-02.jpeg",
    "/azul-01.jpeg",
    "/azul-02.jpeg",
  ],
  variants: {
    Size: "Small",
    Color: "Red",
  },
  stock: 15,
}
export const mockedProducts: Product[] = [
  {
    id: "2",
    name: "Another Product",
    description: "This is another product description.",
    price: { currency: "EUR", amount: "18.50" },
    imagesUrl: ["/product-01.jpeg", "/product-02.jpeg", "/product-03.jpeg"],
    variants: {
      Size: "Medium",
      Color: "Blue",
    },
    stock: 10,
  },
  {
    id: "3",
    name: "Yet Another Product",
    description: "Description for yet another product.",
    price: { currency: "GBP", amount: "30.25" },
    imagesUrl: ["/item-01.jpeg", "/item-02.jpeg", "/item-03.jpeg"],
    variants: {
      Size: "Large",
      Color: "Green",
    },
    stock: 20,
  },
]

export default mockedProduct
