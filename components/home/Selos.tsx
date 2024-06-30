"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import { FullBanner } from "./FullBanners"

interface FullBanners {
  banners: FullBanner[]
}

export function Selos({ banners }: FullBanners) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  const filtred = banners.filter((b) => b.position && b.position === "medium")

  return (
    <>
      <div className="w-full max-w-bisyouContainer my-5 mx-auto xl:my-10">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[plugin.current]}
        >
          <CarouselContent className="max-h-[500px]">
            {filtred.map((b) => (
              <CarouselItem
                key={`bn-${b.id}`}
                className="basis-1/2 xl:basis-1/5"
              >
                {b.image &&
                  b.image.thumbnail &&
                  b.image.thumbnail.lg &&
                  b.image.alt && (
                    <a href={b.url} className="w-full">
                      <Image
                        src={b.image.thumbnail.lg}
                        alt={b.image.alt}
                        width={150}
                        height={150}
                        className="w-[100px] xl:w-[150px] mx-auto isThumb"
                      />
                    </a>
                  )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}
