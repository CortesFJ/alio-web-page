"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

interface CarouselProps {
  imageUrls: string[]
}

const Carousel: React.FC<CarouselProps> = ({ imageUrls }) => {
  const [hash, setHash] = useState(1)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const hs = Number(window.location.hash[1])
    Number.isNaN(hs) ? setHash(0) : setHash(hs)
  }, [params])

  const goToPrevious = () => {
    hash === 0
      ? router.push(`#${imageUrls.length - 1}`)
      : router.push(`#${hash - 1}`)
  }

  const goToNext = () => {
    hash === imageUrls.length - 1
      ? router.push(`#${0}`)
      : router.push(`#${hash + 1}`)
  }

  return (
    <>
      <div className=" w-screen relative">
        <div className=" flex aspect-[10/10] sm:h-[450px] mx-auto gap-1 overflow-scroll snap-mandatory snap-x no-scrollbar  sm:scroll-smooth">
          {imageUrls.map((imageUrl, hash) => (
            <img
              key={hash}
              id={`item${hash}`}
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
        {imageUrls.map((_, i) => {
          const isActive = hash === i
          return (
            <Link
              key={i}
              href={`#${i}`}
              // onClick={() => setCurrentImage(hash)}
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
