"use client"

import { Images } from "@/@types/ProductObject"

interface ProductSummary {
  images: Images
  prices: {
    price: number
    discount: number
  }
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { discountCalculator } from "@/util/discountCalculator"
import Image from "next/image"
import { useState } from "react"

export function ProductSlide({ images, prices }: ProductSummary) {
  const [api, setApi] = useState<CarouselApi>()

  const handleThumb = (key: number) => {
    api && api.scrollTo(key)
  }

  return (
    <>
      <div className="w-full rounded-xl shadow relative">
        <div className="px-3 py-1 text-sm font-medium absolute top-5 left-7 bg-bisyou-yellow rounded-full z-10">
          {discountCalculator(prices.discount, prices.price)}% OFF
        </div>
        <div className="w-[60px] h-[235px] xl:h-[400px] overflow-hidden absolute bottom-10 left-7 z-10">
          <Carousel
            orientation="vertical"
            opts={{
              align: "start",
              dragFree: true,
              axis: "y",
            }}
          >
            <CarouselContent className="h-[235px] xl:h-[400px]">
              {images.edges.map((i, k) => (
                <CarouselItem
                  key={`thumb-${i.node.id}`}
                  className="basis-1/3 lg:basis-1/5"
                >
                  <button
                    key={`thumb-cent-${i.node.id}`}
                    onClick={() => handleThumb(k)}
                    className="rounded-full shadow-inner shadow-bisyou-orangeSd h-[60px] overflow-hidden w-full border-4 border-bisyou-yellow hover:border-bisyou-font"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={i.node.thumbnail}
                      alt={i.node.altText || "thumb-product"}
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <Carousel setApi={setApi} className="rounded-xl overflow-hidden">
          <CarouselContent className="mx-0">
            {images.edges.map((i) => (
              <CarouselItem key={i.node.id} className="pl-0">
                <Image
                  width={1000}
                  height={1000}
                  src={i.node.url}
                  alt={i.node.altText || "product image"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <Button
                        className="rounded-full w-12 h-12 p-0 z-30 absolute top-1/2 -translate-y-1/2 right-3"
                        variant="bisCarousel"
                    >
                        <ChevronRight size={20} strokeWidth={3} />
                    </Button>

                    <Button
                        className="rounded-full w-12 h-12 p-0 z-30 absolute top-1/2 -translate-y-1/2 left-3"
                        variant="bisCarousel"
                    >
                        <ChevronLeft size={20} strokeWidth={3} />
                    </Button> */}
        </Carousel>
      </div>
    </>
  )
}
