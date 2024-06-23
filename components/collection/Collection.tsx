"use client";

import { ColectionNode } from "@/@types/CollectionInProduct";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProductItem } from "../product/ProductItem";

interface CollectionProps {
    collection: ColectionNode;
    transparent?: boolean;
    center?: boolean;
}

export function Collection({
    collection,
    transparent = false,
    center = false,
}: CollectionProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

    const handleNext = () => {
        api && api.scrollNext();
    };
    const handlePrev = () => {
        api && api.scrollPrev();
    };

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div
            data-transparent={transparent}
            className="w-full px-4 py-10 bg-bisyou-secondary overflow-hidden data-[transparent=true]:bg-transparent flex flex-col gap-10"
        >
            <div className="max-w-bisyouContainer w-full mx-auto">
                <h2
                    data-center={center}
                    className="text-cltitle font-fabriga data-[center=true]:mx-auto data-[center=true]:text-center font-medium text-bisyou-font"
                >
                    os mais vendidos
                </h2>
            </div>

            <div className="w-full h-[500px] max-w-bisyouContainer mx-auto relative flex justify-start">
                <div className="absolute left-0 top-0 [&>*]:[&>*]:overflow-visible xl:w-[125%] w-full mx-auto">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            loop: true,
                            breakpoints: {
                                "(min-width: 1024px)": {
                                    align: "start",
                                },
                                "(max-width: 560px)": {
                                    align: "center",
                                },
                            },
                        }}
                        plugins={[plugin.current]}
                    >
                        <CarouselContent className="-ml-0">
                            {collection.products.edges.map((p) => (
                                <CarouselItem
                                    className="xl:basis-1/5 max-sm:px-4"
                                    key={`prod-collection-${p.node.id}`}
                                >
                                    <ProductItem product={p.node} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <Button
                    variant="bisCarousel"
                    onClick={handleNext}
                    className="rounded-full w-[50px] h-[50px] p-0 absolute right-0 xl:right-32 top-[50%] -translate-y-[50px]"
                >
                    <ChevronRight size={30} strokeWidth={1} />
                </Button>

                <Button
                    variant="bisCarousel"
                    onClick={handlePrev}
                    className="rounded-full w-[50px] h-[50px] p-0 absolute left-0 xl:left-32 top-[50%] -translate-y-[50px]"
                >
                    <ChevronLeft size={30} strokeWidth={1} />
                </Button>
            </div>

            <div className="w-full flex justify-center gap-3">
                {Array.from(
                    { length: collection.products.edges.length / 2 },
                    (_, i) => (
                        <span
                            key={`prod-thumb-${i}`}
                            data-active={current - 1 == i ? true : false}
                            className="w-3 h-3 border border-bisyou-font data-[active=true]:bg-red-600 rounded-full"
                        ></span>
                    )
                )}
            </div>
        </div>
    );
}
