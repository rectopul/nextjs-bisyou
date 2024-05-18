"use client";

import { Images } from "@/@types/ProductObject";

interface ProductSummary {
    images: Images;
    prices: {
        price: number;
        discount: number;
    };
}

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { discountCalculator } from "@/util/discountCalculator";

export function ProductSlide({ images, prices }: ProductSummary) {
    return (
        <>
            <div className="w-full rounded-xl shadow relative bg-bisyou-gray">
                <div className="px-3 py-1 text-sm font-medium absolute top-5 left-7 bg-bisyou-yellow rounded-full z-10">
                    {discountCalculator(prices.price, prices.discount)}% OFF
                </div>
                <div className="w-[60px] flex flex-col gap-2 absolute bottom-10 left-7 z-10">
                    {images.edges.map((i) => (
                        <button
                            key={`thumb-${i.node.id}`}
                            className="rounded-full h-[60px] overflow-hidden shadow-sm w-full border-4 border-bisyou-yellow hover:border-bisyou-font"
                        >
                            <img
                                src={i.node.thumbnail}
                                className="w-full"
                                alt={i.node.altText}
                            />
                        </button>
                    ))}
                </div>
                <Carousel>
                    <CarouselContent>
                        {images.edges.map((i) => (
                            <CarouselItem key={i.node.id}>
                                <img src={i.node.url} alt={i.node.altText} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </>
    );
}
