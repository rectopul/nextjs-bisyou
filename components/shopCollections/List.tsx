"use client";

import { CollectionObject } from "@/@types/shopify/Collections";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import useWindowSize from "@/util/useWindowSize";
import { useEffect, useState } from "react";

interface ShopCollections {
    collections: CollectionObject;
}

export function ShopCollections({ collections }: ShopCollections) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [offset, setOffset] = useState<number>(0);
    const [count, setCount] = useState(0);
    const isMobile = useWindowSize().width > 766 ? false : true;

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("slidesInView", (api, evt) => {
            setOffset(api.selectedScrollSnap());
        });

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <>
            <div className="w-full px-4 my-[40px]">
                <div className="w-full max-w-bisyouContainerHome flex justify-between mx-auto *:w-full">
                    <Carousel opts={{ loop: true, align: "start" }}>
                        <CarouselContent className="w-full">
                            {collections.data.collections.edges.map((c, k) => (
                                <CarouselItem
                                    data-mobile={isMobile}
                                    data-off={offset === k}
                                    className="basis-1/2 xl:basis-1/5 data-[mobile=false]:px-4 data-[off=true]:fade-out-20 transition-opacity duration-500"
                                    key={`cll-${c.node.id}`}
                                >
                                    <div className="max-md:w-full flex flex-col gap-3">
                                        <a
                                            href={`/collecoes/${c.node.handle}`}
                                            className="xl:w-[200px] xl:h-[200px] mx-auto relative flex justify-center items-center rounded-full overflow-hidden bg-slate-300"
                                        >
                                            {c.node.image && (
                                                <Image
                                                    alt={
                                                        c.node.image.altText ||
                                                        c.node.handle
                                                    }
                                                    src={c.node.image.thumbnail}
                                                    width={300}
                                                    height={300}
                                                    unoptimized
                                                    className="h-full"
                                                />
                                            )}
                                        </a>

                                        <span className="mx-auto text-center font-medium text-bisyou-font text-[16px]">
                                            {c.node.title}
                                        </span>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </>
    );
}
