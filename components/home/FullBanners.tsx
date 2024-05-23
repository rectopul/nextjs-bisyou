"use client";

import { Banners, BannersImage } from "@prisma/client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface FullBanner extends Banners {
    image: BannersImage | null;
}

interface FullBanners {
    banners: FullBanner[];
}

export function FullBanners({ banners }: FullBanners) {
    const [api, setApi] = useState<CarouselApi>();
    const handleNext = () => api && api.scrollNext();
    const handlePrev = () => api && api.scrollPrev();

    return (
        <>
            <div className="w-full">
                <Carousel setApi={setApi}>
                    <CarouselContent className="max-h-[500px]">
                        {banners.map((b) => (
                            <CarouselItem key={`bn-${b.id}`}>
                                {b.image && (
                                    <a href={b.url} className="w-full">
                                        <Image
                                            src={`/file/${b.image.src}`}
                                            alt={b.image.alt}
                                            width={2000}
                                            height={1000}
                                            className="w-full"
                                        />
                                    </a>
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <Button
                        variant="bisCarousel"
                        onClick={handlePrev}
                        className="absolute rounded-full p-0 z-10 w-[40px] h-[40px] top-1/2 left-5 xl:left-36 -translate-y-1/2"
                    >
                        <ChevronLeft size={20} strokeWidth={2} />
                    </Button>

                    <Button
                        variant="bisCarousel"
                        onClick={handleNext}
                        className="absolute rounded-full z-10 p-0 w-[40px] h-[40px] top-1/2 right-5 xl:right-36 -translate-y-1/2"
                    >
                        <ChevronRight size={20} />
                    </Button>
                </Carousel>
            </div>
        </>
    );
}
