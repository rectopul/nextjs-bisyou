"use client";

import { CollectionInProduct } from "@/@types/CollectionInProduct";
import { Button } from "@/components/ui/button";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";

interface ProductsRecomendedProps {
    collection: CollectionInProduct;
}

export function ProductsRecomended({ collection }: ProductsRecomendedProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
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
        <>
            <div className="w-full px-4 mb-10">
                <Carousel setApi={setApi}>
                    <CarouselContent>
                        {collection.edges.length > 0 &&
                            collection.edges[0].node.products.edges.map((p) => (
                                <CarouselItem
                                    key={`prod-collection-${p.node.id}`}
                                >
                                    <ProductItem
                                        product={p}
                                        variant="spacing"
                                    />
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                    <Button
                        variant="bisCarousel"
                        onClick={handleNext}
                        className="rounded-full w-[50px] h-[50px] p-0 absolute right-0 top-[50%] -translate-y-[50px]"
                    >
                        <ChevronRight size={30} strokeWidth={1} />
                    </Button>

                    <Button
                        variant="bisCarousel"
                        onClick={handlePrev}
                        className="rounded-full w-[50px] h-[50px] p-0 absolute left-0 top-[50%] -translate-y-[50px]"
                    >
                        <ChevronLeft size={30} strokeWidth={1} />
                    </Button>
                </Carousel>
            </div>
            <div className="w-full flex items-center justify-center gap-2 mb-5">
                {Array.from({ length: collection.edges.length + 1 }, (_, i) => (
                    <button
                        data-active={current === i + 1 ? true : false}
                        className="w-2.5 h-2.5 data-[active=true]:bg-red-600 rounded-full border border-bisyou-font"
                        key={`thumb-collection-${i}`}
                    ></button>
                ))}
            </div>
        </>
    );
}
