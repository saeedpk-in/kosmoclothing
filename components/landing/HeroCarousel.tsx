"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
const banners = [
  "/image.png",
  "/banner-2.jpeg",
  "/banner-3.jpeg",
]
export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div className=" ">
              <Card className="p-0">
                <CardContent className="flex items-end justify-center p-0">
                  <Image
                  src={banner}
                  alt={banner}
                  className="w-full h-100 object-cover rounded-2xl"
                  priority
                  width={1000}
                  height={1000}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-[calc(100%+35px)] left-[calc(50%-35px)] "/>
      <CarouselNext className="top-[calc(100%+35px)] right-[calc(50%-35px)] "/>
    </Carousel>
  )
}
