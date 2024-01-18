type User = {
  id: string
  name: string
  email: string
  reviews: Review[]
}

interface Message {
  sender: string
  text: string
  createdAt: Date
}

export type Review = {
  id: string
  rating: number
  text: string
  user: {
    name: string
    id: string
  }
  createdAt: Date
  updated?: Date
  messages?: Message[] // Array of messages in the thread
}

export const ReviewCard = ({ review }: { review: Review }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString()

  return (
    <div data-testid={review.id} className="review-card">
      <header>
        <div className="reviewer-info">
          <span className="name">{review.user.name}</span>
          <span className="rating">{review.rating} stars</span>
        </div>
        <span className="date">{formattedDate}</span>
      </header>
      <div className="review-content">
        <p>{review.text}</p>
      </div>
    </div>
  )
}


interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => (
  <div className="review-list">
    {reviews.map((review) => (
      <ReviewCard key={review.id} review={review} />
    ))}
  </div>
);

export default ReviewList;

