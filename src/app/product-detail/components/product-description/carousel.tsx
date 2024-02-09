"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import { useState, useEffect } from "react"
import Image from "next/image"

const NavDots = ({ items, current }: { items: string[]; current: number }) => (
  <div className="flex justify-center w-full py-2 gap-2">
    {items.map((_, i) => (
      <div
        key={i}
        className={`h-3 w-3  rounded-full
            ${current === i ? "bg-primary" : "bg-secondary"}`}
      ></div>
    ))}
  </div>
)

interface CarouselProps {
  imageUrls: string[]
}

const CarouselView: React.FC<CarouselProps> = ({ imageUrls }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="my-2">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className=" flex aspect-[10/10] sm:h-[450px] mx-auto gap-1 overflow-scroll snap-mandatory snap-x no-scrollbar  sm:scroll-smooth">
                <Image
                  src={imageUrl}
                  alt={`image number ${index}`}
                  className=" w-full left-0 object-cover rounded snap-center"
                  width={400}
                  height={400}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="invisible sm:visible" />
        <CarouselNext className="invisible sm:visible" />
      </Carousel>
      <NavDots items={imageUrls} current={current} />
    </div>
  )
}

export default CarouselView
