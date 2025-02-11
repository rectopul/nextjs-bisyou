"use client"

import { Banners, BannersImage, BannersThumbnail } from "@prisma/client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Autoplay from "embla-carousel-autoplay"

interface ImageBanner extends BannersImage {
  thumbnail: BannersThumbnail | null
}

export interface FullBanner extends Banners {
  image: ImageBanner | null
}

interface FullBanners {
  banners: FullBanner[]
  agent: string
}

enum ModeProps {
  desktop,
  mobile,
}

export function FullBanners({ banners, agent }: FullBanners) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))
  const handleNext = () => api && api.scrollNext()
  const handlePrev = () => api && api.scrollPrev()

  const filtred = banners.filter((b) => b.position && b.position !== "medium")

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      <div className="w-full">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
          plugins={[plugin.current]}
        >
          <CarouselContent className="max-h-[500px]">
            {filtred.map((b) => (
              <CarouselItem key={`bn-${b.id}`} className="pl-0">
                {b.image && b.image.mobile && (
                  <a href={b.url || ""} className="w-full">
                    {agent && agent === "mobile" ? (
                      <Image
                        src={b.image.mobile}
                        alt={b.image.alt}
                        width={500}
                        height={500}
                        className="w-full isThumb"
                        priority={true}
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={b.image.src}
                        alt={b.image.alt}
                        width={2000}
                        height={2000}
                        className="w-full"
                        priority={true}
                        unoptimized
                      />
                    )}
                  </a>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>

          <ul className="flex h-3 self-center absolute justify-center items-center bottom-2 gap-2 left-1/2 -translate-x-1/2">
            {Array.from({ length: count }).map((_, i) => (
              <li
                key={`blt-f-${i}`}
                data-active={current === i + 1}
                data-index={i}
                data-current={current}
                className="bg-white data-[active=true]:bg-bisyou-default rounded-full h-3 w-3 border border-bisyou-gray"
              ></li>
            ))}
          </ul>

          <Button
            variant="bisCarousel"
            onClick={handlePrev}
            className="absolute rounded-full p-0 z-10 w-[40px] h-[40px] top-1/2 left-5 xl:left-52 -translate-y-1/2"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </Button>

          <Button
            variant="bisCarousel"
            onClick={handleNext}
            className="absolute rounded-full z-10 p-0 w-[40px] h-[40px] top-1/2 right-5 xl:right-52 -translate-y-1/2"
          >
            <ChevronRight size={20} />
          </Button>
        </Carousel>
      </div>
    </>
  )
}
