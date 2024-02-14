"use client"

import { useState, useEffect, useRef } from "react"

type User = {
  id: string
  name: string
  email: string
  reviews: Review[]
}

interface Message {
  sender: "seller" | "customer" | "admin"
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

interface ReviewCardProps {
  review: Review
  active: boolean
}
export const ReviewCard = ({ review, active }: ReviewCardProps) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString()

  return (
    <article
      data-testid={review.id}
      className={`review-card grid gap-2 ${active ? "block" : "hidden"} transition-all duration-300`}
    >
      <header>
        <div className="reviewer-info">
          <h4 className="name">{review.user.name}</h4>
          <p className="rating">{review.rating} stars</p>
        </div>
        <time
          suppressHydrationWarning={true}
          className=" text-xs text-muted "
          dateTime={review.createdAt.toISOString()}
        >
          {formattedDate}
        </time>
      </header>
      <section className="review-content">
        <p>{review.text}</p>
      </section>
      {/* {review.messages?.length && (
        <section className="message-thread">
          <ul>
            {review.messages.map((message, i) => (
              <li key={i} className="message">
                <p className="message-content">{message.text}</p>
                <div className="message-meta">
                  <span className="sender">{message.sender}</span>
                  <time
                    className="date"
                    dateTime={message.createdAt.toISOString()}
                    suppressHydrationWarning={true}
                  >
                    {new Date(message.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )} */}
    </article>
  )
}
// export const ReviewCard = ({ review, active }: ReviewCardProps) => {
//   const formattedDate = new Date(review.createdAt).toLocaleDateString()

//   return (
//     <article
//       data-testid={review.id}
//       className={`review-card ${active ? " border border-red-400" : ""}`}
//     >
//       <header>
//         <div className="reviewer-info">
//           <h4 className="name">{review.user.name}</h4>
//           <p className="rating">{review.rating} stars</p>
//         </div>
//         <time
//           suppressHydrationWarning={true}
//           className="date"
//           dateTime={review.createdAt.toISOString()}
//         >
//           {formattedDate}
//         </time>
//       </header>
//       <section className="review-content">
//         <p>{review.text}</p>
//       </section>
//       {review.messages?.length && (
//         <section className="message-thread">
//           <ul>
//             {review.messages.map((message, i) => (
//               <li key={i} className="message">
//                 <p className="message-content">{message.text}</p>
//                 <div className="message-meta">
//                   <span className="sender">{message.sender}</span>
//                   <time
//                     className="date"
//                     dateTime={message.createdAt.toISOString()}
//                     suppressHydrationWarning={true}
//                   >
//                     {new Date(message.createdAt).toLocaleDateString()}
//                   </time>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}
//     </article>
//   )
// }

interface ReviewListProps {
  reviews: Review[]
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef(null)

  const handleNextSlide = () => {
    setCurrentSlide(() => (currentSlide + 1) % reviews.length)
  }

  const handlePreviousSlide = () => {
    setCurrentSlide((currentSlide - 1 + reviews.length) % reviews.length)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextSlide()
    }, 4000)
    return () => clearInterval(intervalId)
  }, [currentSlide])

  const handleClick = (event: any) => {
    const clickedSlide = event.target.closest(".review-card")

    if (clickedSlide) {
      const index = Array.from(carouselRef.current?.children).indexOf(
        clickedSlide
      )

      setCurrentSlide(index)
    }
  }

  return (
    <article className="flex px-2 justify-center" onClick={handleClick}>
      <button className="" onClick={handlePreviousSlide}>
        {"<<"}
      </button>
      <div className="h-3/4 mx-4 text-center" ref={carouselRef}>
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            review={review}
            active={index === currentSlide}
          />
        ))}
      </div>
      <button className="" onClick={handleNextSlide}>
        {">>"}
      </button>
    </article>
  )
}

export default ReviewList
