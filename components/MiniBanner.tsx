import { MiniBanners, MiniBannersImages } from "@prisma/client"
import Image from "next/image"
import { BannersWithImages } from "@/app/page"
import { headers } from "next/headers"

export interface MiniBannerExt extends MiniBanners {
  image: MiniBannersImages | null
}

interface MiniBannerProps {
  miniBanner: BannersWithImages
}

export async function MiniBanner({ miniBanner }: MiniBannerProps) {
  const header = await headers()

  const viewPort = await header.get("viewport")

  if (!miniBanner.image) return null
  const mobileBanner = miniBanner.image.mobile

  return (
    <>
      <div className="w-full px-4 my-[40px]">
        <div className="w-full max-w-bisyouContainerHome mx-auto">
          <a href={miniBanner.url} aria-label={miniBanner.title || ""}>
            {viewPort && viewPort === "mobile" && mobileBanner ? (
              <Image
                data-dimension="mobile"
                alt={miniBanner.image.name}
                width={1200}
                height={100}
                src={mobileBanner}
                className="w-full"
              />
            ) : (
              <Image
                data-dimension="desktop"
                alt={miniBanner.image.name}
                width={1200}
                height={100}
                src={miniBanner.image.src}
                className="w-full"
              />
            )}
          </a>
        </div>
      </div>
    </>
  )
}
