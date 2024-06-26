"use client"

import { Colletions as PrismaCollection } from "@prisma/client"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import useWindowSize from "@/util/useWindowSize"
import { useEffect, useState } from "react"

interface ShopCollections {
  collections: PrismaCollection[]
}

export function ShopCollections({ collections }: ShopCollections) {
  const [offset, setOffset] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // ajuste o valor conforme necessário
    }

    // Verifica o tamanho da tela no momento da montagem
    handleResize()

    // Adiciona o event listener
    window.addEventListener("resize", handleResize)

    // Limpa o event listener ao desmontar
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div className="w-full px-4 my-[40px]">
        <div className="w-full max-w-bisyouContainerHome flex justify-between mx-auto *:w-full">
          <Carousel opts={{ loop: true, align: "start" }}>
            <CarouselContent className="w-full">
              {collections &&
                collections.map((c, k) => (
                  <CarouselItem
                    data-mobile={isMobile}
                    data-off={offset === k}
                    className="basis-1/2 xl:basis-1/5 data-[mobile=false]:px-4 data-[off=true]:fade-out-20 transition-opacity duration-500"
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
