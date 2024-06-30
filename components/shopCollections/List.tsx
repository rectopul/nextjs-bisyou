"use client"

import { Colletions as PrismaCollection } from "@prisma/client"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useState } from "react"

interface ShopCollections {
  collections: PrismaCollection[]
  viewPort: string
}

export function ShopCollections({ collections, viewPort }: ShopCollections) {
  const [offset, _] = useState<number>(0)

  return (
    <>
      <div className="w-full px-4 my-[40px]">
        <div className="w-full max-w-bisyouContainerHome flex justify-between mx-auto *:w-full">
          <Carousel
            opts={{
              loop: true,
              align: "start",
              breakpoints: {
                766: {
                  align: "center",
                },
              },
            }}
          >
            <CarouselContent className="w-full max-md:mx-0">
              {collections &&
                collections.map((c, k) => (
                  <CarouselItem
                    data-mobile={viewPort === "mobile"}
                    data-off={offset === k}
                    className="basis-1/2 xl:basis-1/5 px-4 data-[off=true]:fade-out-20 transition-opacity duration-500"
                    key={`cll-${c.id}`}
                  >
                    <div className="max-md:w-full flex flex-col gap-3">
                      <a
                        href={`/collecoes/${c.slug}`}
                        className="xl:w-[200px] xl:h-[200px] mx-auto relative flex justify-center items-center rounded-full overflow-hidden bg-slate-300"
                      >
                        {c.thumbnail ? (
                          <Image
                            alt={c.slug}
                            src={c.thumbnail}
                            width={300}
                            height={300}
                            unoptimized
                            className="h-full"
                          />
                        ) : (
                          <Image
                            alt={c.slug}
                            src={`https://placehold.co/400?text=${c.slug}`}
                            width={300}
                            height={300}
                            unoptimized
                            className="h-full"
                          />
                        )}
                      </a>

                      <span className="mx-auto text-center font-medium text-bisyou-font text-[16px]">
                        {c.title}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  )
}
