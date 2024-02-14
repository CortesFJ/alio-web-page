import type { Review } from "@/components/productReview"

export const mockReviews: Review[] = [
  {
    id: "1",
    rating: 4.5,
    text: "Amazing product!",
    user: { name: "Alice", id: "234" },
    createdAt: new Date("2024-01-12"),
    messages: [
      {
        sender: "seller",
        text: "Thank you for your feedback!",
        createdAt: new Date("2024-01-18"),
      },
      {
        sender: "customer",
        text: "You're welcome!",
        createdAt: new Date("2024-01-19"),
      },
    ],
  },
  {
    id: "2",
    rating: 3,
    text: "Decent product, could be better.",
    user: { name: "Bob", id: "345" },
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "123",
    rating: 4,
    text: "I love this product, it works perfectly.",
    user: { name: "John Doe", id: "123" },
    createdAt: new Date("2024-01-18"),
  },
]
