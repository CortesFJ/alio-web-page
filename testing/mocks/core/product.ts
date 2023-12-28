import { Product } from "@/types"

const mockedProduct: Product = {
  id: "1",
  name: "Sample Product",
  description: "This is a sample product description.",
  price: { currency: "USD", amount: "23.00" },
  imagesUrl: ["/cafe-01.jpeg", "/cafe-02.jpeg"],
  variants: {
    Color: "Red",
    Size: "Small",
  },
  stock: 15,
}
export const mockedProducts: Product[] = [
  {
    id: "2",
    name: "Another Product",
    description: "This is another product description.",
    price: { currency: "EUR", amount: "18.50" },
    imagesUrl: ["/azul-01.jpeg", "/azul-02.jpeg"],
    variants: {
      Color: "Blue",
      Size: "Medium",
      Genre: "Man",
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
      Color: "Green",
      Size: "Large",
    },
    stock: 20,
  },
  {
    id: "4",
    name: "Some Product",
    description: "Description for some product.",
    price: { currency: "GBP", amount: "60.05" },
    imagesUrl: ["/item-01.jpeg", "/item-02.jpeg", "/item-03.jpeg"],
    variants: {
      Color: "Green",
      Size: "Small",
    },
    stock: 20,
  },
]

export default mockedProduct
