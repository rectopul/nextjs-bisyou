"use client"

import { MiniBanners, MiniBannersImages } from "@prisma/client"
import Image from "next/image"
import { BannersWithImages } from "@/app/page"
import { useEffect, useState } from "react"

export interface MiniBannerExt extends MiniBanners {
  image: MiniBannersImages | null
}

interface MiniBannerProps {
  miniBanner: BannersWithImages
}

export function MiniBanner({ miniBanner }: MiniBannerProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTab, setIsTab] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.innerWidth <= 768 && setIsMobile(true)
      window.innerWidth > 768 && window.innerWidth <= 1024 && setIsTab(true)
    }
  }, [window])

  if (!miniBanner.image) return null
  const mobileBanner = miniBanner.image.mobile
  const tabBanner = miniBanner.image.thumbnail?.lg

  return (
    <>
      <div className="w-full px-4 my-[40px]">
        <div className="w-full max-w-bisyouContainerHome mx-auto">
          <a href={miniBanner.url} aria-label={miniBanner.title || ""}>
            {isMobile && mobileBanner ? (
              <Image
                data-dimension="mobile"
                alt={miniBanner.image.name}
                width={1200}
                height={100}
                src={mobileBanner}
                className="w-full"
              />
            ) : isTab && tabBanner ? (
              <Image
                data-dimension="tab"
                alt={miniBanner.image.name}
                width={1200}
                height={100}
                src={tabBanner}
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
