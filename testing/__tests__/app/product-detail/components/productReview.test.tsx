import { render, screen } from "@testing-library/react"

import ReviewList, { Review, ReviewCard } from "@/components/productReview"

const mockReviews: Review[] = [
  {
    id: "1",
    rating: 5,
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
        sender: "user",
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
describe("ReviewCart component", () => {
  test("Renders review card with correct information", () => {
    const mockReview = mockReviews[0]

    render(<ReviewCard review={mockReview} />)

    expect(screen.getByTestId(mockReview.id)).toBeInTheDocument()
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument()
    expect(screen.getByText(`${mockReview.rating} stars`)).toBeInTheDocument()
    expect(screen.getByText(mockReview.text)).toBeInTheDocument()
    expect(
      screen.getByText(new Date(mockReview.createdAt).toLocaleDateString())
    ).toBeInTheDocument()
    expect(screen.getByText("Thank you for your feedback!")).toBeInTheDocument()
    expect(screen.getByText("You're welcome!")).toBeInTheDocument()
  })

  test("when there are a tread of messages in the review, renders it properly", () => {})
})

test("Renders all review cards with correct information", () => {
  render(<ReviewList reviews={mockReviews} />)

  mockReviews.forEach(({ id }) => {
    expect(screen.getByTestId(id)).toBeInTheDocument()
  })
})
