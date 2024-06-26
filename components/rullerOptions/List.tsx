"use client"

import { RullerOptions } from "@prisma/client"
import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface RullerOptionsProps {
  ruller_options: RullerOptions[]
}

export function ListRullerOptions({ ruller_options }: RullerOptionsProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.innerWidth <= 966 && setIsMobile(true)
    }
  }, [])

  if (isMobile) {
    return (
      <Carousel className="w-full bg-bisyou-fontLight text-white py-6 uppercase font-medium text-sm">
        <CarouselContent>
          {ruller_options.map((r) => (
            <CarouselItem key={`ro-${r.id}`}>
              <div className="flex justify-center items-center m-auto text-center">
                {r.title}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    )
  }

  return (
    <>
      <div className="w-full bg-bisyou-fontLight hidden md:flex text-white px-4 py-6 uppercase justify-between gap-40 font-medium text-sm">
        {ruller_options.map((r) => (
          <div className="p-0" key={`ro-${r.id}`}>
            {r.title}
          </div>
        ))}
      </div>
    </>
  )
}
