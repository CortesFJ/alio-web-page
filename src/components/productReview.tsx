type User = {
  id: string
  name: string
  email: string
  reviews: Review[]
}

interface Message {
  sender: 'seller' | 'customer' | 'admin'
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
  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  return (
    <article data-testid={review.id} className="review-card">
      <header>
        <div className="reviewer-info">
          <h4 className="name">{review.user.name}</h4>
          <p className="rating">{review.rating} stars</p>
        </div>
        <time className="date" dateTime={review.createdAt.toISOString()}>
          {formattedDate}
        </time>
      </header>
      <section className="review-content">
        <p>{review.text}</p>
      </section>
      {review.messages?.length && (
        <section className="message-thread">
          <ul>
            {review.messages.map((message, i) => (
              <li key={i} className="message">
                <p className="message-content">{message.text}</p>
                <div className="message-meta">
                  <span className="sender">{message.sender}</span>
                  <time className="date" dateTime={message.createdAt.toISOString()}>
                    {new Date(message.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => (
  <section className="review-list">
    {reviews.map((review) => (
      <ReviewCard key={review.id} review={review} />
    ))}
  </section>
);

export default ReviewList;
