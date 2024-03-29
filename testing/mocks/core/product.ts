import { Product } from "@/core/product-repository/product"

const mockedProduct: Product = {
  id: "1",
  name: "Sample Product",
  description: "This is a sample product description.",
  price: { currency: "USD", amount: "23.00" },
  imageUrls: ["/cafe-01.jpeg", "/cafe-02.jpeg"],
  variants: {
    cssColor: "hsla(0, 63%, 45%, 1)",
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
    imageUrls: ["/azul-01.jpeg", "/azul-02.jpeg"],
    variants: {
      cssColor: "hsla(227, 72%, 40%, 1)",
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
    imageUrls: [
      "https://picsum.photos/600/400?random=4",
      "https://picsum.photos/600/400?random=9",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(98, 44%, 28%, 1)",
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
    imageUrls: [
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=7",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(98, 44%, 28%, 1)",
      Color: "Green",
      Size: "Small",
    },
    stock: 20,
  },
]

export const mockedWallets: Product[] = [
  {
    id: "5",
    name: "Executive Edition",
    description:
      "Handcrafted full-grain leather bifold with a sleek minimalist design. Features internal pockets for cards and bills, plus a hidden money clip. Available in classic black, rich brown, and bold tan.",
    price: { currency: "USD", amount: "249.99" },
    imageUrls: [
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=6",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(0, 63%, 45%, 1)",
      Color: "Red",
      Material: "Leather",
    },
    stock: 50,
  },
  {
    id: "6",
    name: "Micro Carry",
    description:
      "Ultra-thin and lightweight cardholder made from recycled aluminum. Securely holds up to 12 cards with RFID blocking technology. Available in matte black, brushed silver, and anodized rose gold.",
    price: { currency: "USD", amount: "49.99" },
    imageUrls: [
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=7",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(0, 63%, 45%, 1)",
      Color: "Red",
      Material: "Aluminum",
    },
    stock: 100,
  },
  {
    id: "7",
    name: "Adventure Awaits",
    description:
      "Durable canvas zip wallet with a fun, travel-inspired print. Features multiple compartments for cards, bills, and receipts. Available in blue and tan patterns.",
    price: { currency: "USD", amount: "34.99" },
    imageUrls: [
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=4",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(0, 63%, 45%, 1)",
      Color: "Red",
      Material: "Canvas",
    },
    stock: 200,
  },
  {
    id: "8",
    name: "Quick Draw",
    description:
      "Stainless steel money clip combined with a sleek leather cardholder. Securely holds cash and up to 6 cards. Available in polished silver and matte black.",
    price: { currency: "USD", amount: "69.99" },
    imageUrls: [
      "https://picsum.photos/600/400?random=3",
      "https://picsum.photos/600/400?random=8",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(0, 0%, 0%, 1)",
      Color: "Black",
      Material: "Stainless Steel",
    },
    stock: 75,
  },
  {
    id: "9",
    name: "Green Guardian",
    description:
      "Crafted from recycled water bottles, this vegan leather wallet offers sustainable style. Features RFID blocking and multiple compartments for cards and bills. Available in forest green and charcoal grey.",
    price: { currency: "USD", amount: "54.99" },
    imageUrls: [
      "https://picsum.photos/600/400?random=9",
      "https://picsum.photos/600/400?random=3",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(227, 72%, 40%, 1)",
      Color: "Blue",
      Material: "Recycled PET Leather",
    },
    stock: 150,
  },
  {
    id: "10",
    name: "Green Guardian",
    description:
      "Crafted from recycled water bottles, this vegan leather wallet offers sustainable style. Features RFID blocking and multiple compartments for cards and bills. Available in forest green and charcoal grey.",
    price: { currency: "USD", amount: "54.99" },
    imageUrls: [
      "https://picsum.photos/600/400?random=7",
      "https://picsum.photos/600/400?random=8",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(227, 72%, 40%, 1)",
      Color: "Blue",
      Material: "Recycled PET Leather",
    },
    stock: 150,
  },
  {
    id: "8",
    name: "Quick Draw",
    description:
      "Stainless steel money clip combined with a sleek leather cardholder. Securely holds cash and up to 6 cards. Available in polished silver and matte black.",
    price: { currency: "USD", amount: "69.99" },
    imageUrls: [
      "https://picsum.photos/600/400?random=6",
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(0, 0%, 0%, 1)",
      Color: "Black",
      Material: "Leather",
    },
    stock: 75,
  },
  {
    id: "9",
    name: "Green Guardian",
    description:
      "Crafted from recycled water bottles, this vegan leather wallet offers sustainable style. Features RFID blocking and multiple compartments for cards and bills. Available in forest green and charcoal grey.",
    price: { currency: "USD", amount: "54.99" },
    imageUrls: [
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=4",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(98, 44%, 28%, 1)",
      Color: "Green",
      Material: "Leather",
    },
    stock: 150,
  },
  {
    id: "10",
    name: "Green Guardian",
    description:
      "Crafted from recycled water bottles, this vegan leather wallet offers sustainable style. Features RFID blocking and multiple compartments for cards and bills. Available in forest green and charcoal grey.",
    price: { currency: "USD", amount: "54.99" },
    imageUrls: [
      "https://picsum.photos/600/400?random=3",
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=1",
    ],
    variants: {
      cssColor: "hsla(227, 72%, 40%, 1)",
      Color: "Blue",
      Material: "Leather",
    },
    stock: 150,
  },
]

export default mockedProduct
