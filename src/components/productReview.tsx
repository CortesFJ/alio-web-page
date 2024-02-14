"use client"

import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Star, StarHalf } from "lucide-react"

// type User = {
//   id: string
//   name: string
//   email: string
//   reviews: Review[]
// }

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

export function ReviewCard({ reviews }: { reviews: Review[] }) {
  const plugin = useRef(Autoplay({ delay: 4500, stopOnInteraction: true }))

  function getIntegerPart(num: number) {
    if (Number.isInteger(num)) return num

    return Number(num.toString().split(".")[0])
  }
  function getDecimalPart(num: number) {
    if (Number.isInteger(num)) return 0

    return Number(num.toString().split(".")[1][0])
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full mx-auto  sm:max-w-xs sm:mx-8"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {reviews.map((review, index) => (
          <CarouselItem key={index} data-testid={review.id}>
            <div className="p-1 mt-14 h-52">
              <Card>
                <CardContent className=" max-h-full  w-full flex flex-col gap-2 overflow-scroll items-center justify-center p-6">
                  <strong className="name">{review.user.name}</strong>
                  <div className="flex justify-center">
                    {[...Array(getIntegerPart(review.rating)).keys()].map(
                      (_) => (
                        <Star className=" text-yellow-500 h-5" />
                      )
                    )}
                    {getDecimalPart(review.rating) > 4 ? (
                      <StarHalf className=" text-yellow-500 h-5" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <p>{review.text}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:inline-flex" />
      <CarouselNext className="hidden sm:inline-flex" />
    </Carousel>
  )
}

interface ReviewListProps {
  reviews: Review[]
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="h-3/4 mx-4 text-center">
      <ReviewCard reviews={reviews} />
    </div>
  )
}

export default ReviewList
