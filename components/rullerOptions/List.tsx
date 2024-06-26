"use client"

import { RullerOptions } from "@prisma/client"
import { useRef } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface RullerOptionsProps {
  ruller_options: RullerOptions[]
}

export function ListRullerOptions({ ruller_options }: RullerOptionsProps) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  return (
    <Carousel
      className="w-full bg-bisyou-fontLight text-white py-6 uppercase font-medium text-sm"
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
    >
      <CarouselContent className="w-full">
        {ruller_options.map((r) => (
          <CarouselItem key={`ro-${r.id}`} className="md:basis-1/4">
            <div className="flex justify-center items-center m-auto text-center">
              {r.title}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
