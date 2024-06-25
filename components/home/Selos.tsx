"use client";

import { Banners, BannersImage, BannersThumbnail } from "@prisma/client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/util/useWindowSize";
import Autoplay from "embla-carousel-autoplay";
import { FullBanner } from "./FullBanners";

interface ImageBanner extends BannersImage {
    thumbnail: BannersThumbnail | null;
}

interface FullBanners {
    banners: FullBanner[];
}

export function Selos({ banners }: FullBanners) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

    const filtred = banners.filter(
        (b) => b.position && b.position === "medium"
    );

    const screenSize = useWindowSize().width;

    useEffect(() => {
        if (screenSize > 766) setIsMobile(false);
        else setIsMobile(true);
    }, [screenSize]);

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
                                {b.image && (
                                    <a href={b.url} className="w-full">
                                        {isMobile && b.image.thumbnail ? (
                                            <Image
                                                src={b.image.thumbnail.md}
                                                alt={b.image.thumbnail.alt}
                                                width={b.image.thumbnail.width}
                                                height={
                                                    b.image.thumbnail.heigth
                                                }
                                                className="w-[100px] xl:w-[150px] mx-auto isThumb"
                                            />
                                        ) : (
                                            <Image
                                                src={b.image.src}
                                                alt={b.image.alt}
                                                width={2000}
                                                height={1000}
                                                className="w-[100px] xl:w-[150px] mx-auto isThumb"
                                            />
                                        )}
                                    </a>
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    );
}
