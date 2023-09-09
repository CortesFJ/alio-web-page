import { ProductSet } from "@/app/product-detail/product-set"

const mockedProductSet: ProductSet = {
  id: "1",
  name: "Sample Product",
  description: "This is a sample product description.",
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
  stockInfo: {
    Size: {
      Small: {
        Color: {
          Red: {
            imagesUrl: "sample-image-url.jpg",
            availability: 1,
            price: { currency: "USD", amount: "20.00" },
          },
          Blue: {
            imagesUrl: "sample-image-url.jpg",
            availability: 2,
            price: { currency: "USD", amount: "23.00" },
          },
          Green: {
            imagesUrl: "sample-image-url.jpg",
            availability: 3,
            price: { currency: "USD", amount: "29.00" },
          },
        },
      },
      Medium: {
        Color: {
          Red: {
            availability: 4,
            price: { currency: "USD", amount: "20.00" },
            imagesUrl: "sample-image-url.jpg",
          },
          Blue: {
            imagesUrl: "sample-image-url.jpg",
            availability: 5,
            price: { currency: "USD", amount: "23.00" },
          },
          Green: {
            imagesUrl: "sample-image-url.jpg",
            availability: 6,
            price: { currency: "USD", amount: "30.00" },
          },
        },
      },
      Large: {
        Color: {
          Red: {
            imagesUrl: "sample-image-url.jpg",
            availability: 7,
            price: { currency: "USD", amount: "22.00" },
          },
          Blue: {
            imagesUrl: "sample-image-url.jpg",
            availability: 8,
            price: { currency: "USD", amount: "31.00" },
          },
          Green: {
            imagesUrl: "sample-image-url.jpg",
            availability: 9,
            price: { currency: "USD", amount: "40.00" },
          },
        },
      },
    },
  },
}
export default mockedProductSet
