import { render, screen } from "@testing-library/react"

import ReviewList, { Review, ReviewCard } from "@/components/productReview"
import { mockReviews } from "../../mocks/components/productReview"

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

  test("", () => {})
})

test("Renders all review cards with correct information", () => {
  render(<ReviewList reviews={mockReviews} />)

  mockReviews.forEach(({ id }) => {
    expect(screen.getByTestId(id)).toBeInTheDocument()
  })
})
