import { Product } from "@/core/product-repository/domain/product"

const mockedProduct: Product = {
  id: "1",
  name: "Sample Product",
  price: { currency: "USD", amount: "20.00" },
  description: "This is a sample product description.",
  imageUrl: "sample-image-url.jpg",
  variants: [
    {
      name: "Size",
      options: ["Small", "Medium", "Large"],
    },
    {
      name: "Color",
      options: ["Red", "Blue", "Green"],
    },
  ],
  stock: {
    Size: {
      Small: {
        Color: {
          Red: { availability: 1, price: { currency: "USD", amount: "20.00" } },
          Blue: {
            availability: 2,
            price: { currency: "USD", amount: "23.00" },
          },
          Green: {
            availability: 3,
            price: { currency: "USD", amount: "29.00" },
          },
        },
      },
      Medium: {
        Color: {
          Red: { availability: 4, price: { currency: "USD", amount: "20.00" } },
          Blue: {
            availability: 5,
            price: { currency: "USD", amount: "23.00" },
          },
          Green: {
            availability: 6,
            price: { currency: "USD", amount: "30.00" },
          },
        },
      },
      Large: {
        Color: {
          Red: { availability: 7, price: { currency: "USD", amount: "22.00" } },
          Blue: {
            availability: 8,
            price: { currency: "USD", amount: "31.00" },
          },
          Green: {
            availability: 9,
            price: { currency: "USD", amount: "40.00" },
          },
        },
      },
    },
  },
}
export default mockedProduct
