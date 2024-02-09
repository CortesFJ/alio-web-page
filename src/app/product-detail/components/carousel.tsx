"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LeftArrow, RightArrow } from "./arrow-buttons"

const NavDots = ({ items, current }: { items: string[]; current: number }) => (
  <div className="flex justify-center w-full py-2 gap-2">
    {items.map((_, i) => (
      <Link
        key={i}
        href={`#item${i}`}
        className={`h-4 w-4 border hover:bg-primary rounded-full
            ${current === i ? "bg-primary" : "bg-secondary"}`}
      ></Link>
    ))}
  </div>
)

interface CarouselProps {
  imageUrls: string[]
}

const CarouselView: React.FC<CarouselProps> = ({ imageUrls }) => {
  const [hash, setHash] = useState(0)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const hs = Number(hash.split("#item")[1])
      Number.isNaN(hs) ? setHash(0) : setHash(hs)
    } else {
      router.push("#item0")
      setHash(0)
    }
  }, [params])

  const goToPrevious = () => {
    hash === 0
      ? router.push(`#item${imageUrls.length - 1}`)
      : router.push(`#item${hash - 1}`)
  }

  const goToNext = () => {
    hash === imageUrls.length - 1
      ? router.push(`#item0`)
      : router.push(`#item${hash + 1}`)
  }

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      console.log("current")
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div>
      <Carousel setApi={setApi} className="max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="invisible sm:visible"/>
        <CarouselNext className="invisible sm:visible"/>
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
    // <section>
    //   <div className=" w-screen relative">
    //     <div className=" flex aspect-[10/10] sm:h-[450px] mx-auto gap-1 overflow-scroll snap-mandatory snap-x no-scrollbar  sm:scroll-smooth">
    //       {imageUrls.map((imageUrl, i) => (
    //         <Image
    //           key={i}
    //           src={imageUrl}
    //           alt={`image number ${i}`}
    //           className=" w-full left-0 object-cover rounded snap-center"
    //           width={400}
    //           height={400}
    //         />
    //       ))}
    //     </div>
    //     <div className="absolute flex justify-between w-full px-4 top-1/2">
    //       <LeftArrow handleClick={goToPrevious} />
    //       <RightArrow handleClick={goToNext} />
    //     </div>
    //   </div>
    //   <div className="">
    //     <NavDots items={imageUrls} current={hash} />
    //   </div>
    // </section>
  )
}

export default CarouselView

// <img
//   id={`item${i}`}
//   src={imageUrl}
//   className=" w-full left-0 object-cover rounded snap-center"
// />
