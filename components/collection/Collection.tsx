"use client";

import {
    CollectionEdge,
    CollectionInProduct,
} from "@/@types/CollectionInProduct";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductItem } from "../product/ProductItem";

interface CollectionProps {
    collection: CollectionEdge;
}

export function Collection({ collection }: CollectionProps) {
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
            <div className="w-full px-4 py-10 bg-bisyou-secondary flex flex-col gap-10">
                <div className="max-w-bisyouContainer w-full mx-auto">
                    <h2 className="text-3xl font-medium text-bisyou-font">
                        {collection.node.title}
                    </h2>
                </div>

                <div className="w-full mx-auto">
                    <Carousel setApi={setApi} opts={{ align: "start" }}>
                        <CarouselContent>
                            {collection.node.products.edges.map((p) => (
                                <CarouselItem
                                    className="basis-1/6"
                                    key={`prod-collection-${p.node.id}`}
                                >
                                    <ProductItem product={p} />
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

                <div className="w-full flex justify-center gap-3">
                    {Array.from(
                        { length: collection.node.products.edges.length / 2 },
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
        </>
    );
}
