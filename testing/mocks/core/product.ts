import { Product } from "@/core/types"

const mockedProduct: Product = {
  id: "1",
  name: "Sample Product",
  description: "This is a sample product description.",
  price: { currency: "USD", amount: "23.00" },
  imagesUrl: "sample-image-url.jpg",
  variants: [
    {
      name: "Size",
      option: "Small",
    },
    {
      name: "Color",
      option: "Red",
    },
  ],
  stock: 15,
}
export default mockedProduct
