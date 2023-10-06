"use client"

import { useState } from "react"

interface CarouselProps {
  imageUrls: string[]
}

import { useRouter } from "next/navigation"
import Link from "next/link"

const Carousel: React.FC<CarouselProps> = ({ imageUrls }) => {
  const [currenImage, setCurrentImage] = useState(1)
  const router = useRouter()

  const goToPrevious = () => {
    if (currenImage === 0) {
      router.push(`#item${imageUrls.length - 1}`)
      setCurrentImage(imageUrls.length - 1)
      return
    }
    router.push(`#item${currenImage - 1}`)
    setCurrentImage(currenImage - 1)
  }

  const goToNext = () => {
    if (currenImage === imageUrls.length - 1) {
      router.push(`#item${0}`)
      setCurrentImage(0)
      return
    }
    router.push(`#item${currenImage + 1}`)
    setCurrentImage(currenImage + 1)
  }

  return (
    <>
      <div className=" w-screen relative">
        <div className=" flex aspect-[10/10] sm:h-[450px] mx-auto gap-1 overflow-scroll snap-mandatory snap-x no-scrollbar  sm:scroll-smooth">
          {imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              id={`item${index}`}
              src={imageUrl}
              className=" w-full left-0 object-cover rounded snap-center"
            />
          ))}
        </div>
        <div className="absolute flex justify-between w-full px-4 top-1/2">
          <button
            className="p-2 rounded-md border  opacity-70 hover:opacity-100 hidden sm:block"
            onClick={goToPrevious}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            className="p-2 rounded-md border  opacity-70 hover:opacity-100 hidden sm:block "
            onClick={goToNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {imageUrls.map((_, index) => {
          const isActive = currenImage === index
          return (
            <Link
              key={index}
              href={`#item${index}`}
              onClick={() => setCurrentImage(index)}
              className={`h-4 w-4 border hover:bg-primary rounded-full
            ${isActive ? "bg-primary" : "bg-secondary"}`}
            ></Link>
          )
        })}
      </div>
    </>
  )
}

export default Carousel
