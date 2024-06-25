import { MiniBanners, MiniBannersImages } from "@prisma/client"
import Image from "next/image"
import { BannersWithImages } from "@/app/page"

export interface MiniBannerExt extends MiniBanners {
  image: MiniBannersImages | null
}

interface MiniBannerProps {
  miniBanner: BannersWithImages
}

export function MiniBanner({ miniBanner }: MiniBannerProps) {
  if (!miniBanner.image) return false

  console.log(`minibanner retornado`, miniBanner)

  return (
    <>
      <div className="w-full px-4 my-[40px]">
        <div className="w-full max-w-bisyouContainerHome mx-auto">
          <a href={miniBanner.url} aria-label={miniBanner.title || ""}>
            <Image
              alt={miniBanner.image.name}
              width={1200}
              height={100}
              src={miniBanner.image.src}
              className="w-full"
            />
          </a>
        </div>
      </div>
    </>
  )
}
