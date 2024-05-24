"use client";

import { CollectionObject } from "@/@types/shopify/Collections";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface ShopCollections {
    collections: CollectionObject;
}

export function ShopCollections({ collections }: ShopCollections) {
    return (
        <>
            <div className="w-full px-4 my-[40px]">
                <div className="w-full max-w-bisyouContainerHome flex justify-between mx-auto">
                    <Carousel opts={{ loop: true, align: "start" }}>
                        <CarouselContent>
                            {collections.data.collections.edges.map((c) => (
                                <CarouselItem
                                    className="basis-1/2 xl:basis-1/5"
                                    key={`cll-${c.node.id}`}
                                >
                                    <div className="max-md:w-full flex flex-col gap-3">
                                        <a
                                            href={`/collecoes/${c.node.handle}`}
                                            className="xl:w-[200px] xl:h-[200px] relative flex justify-center items-center rounded-full overflow-hidden bg-slate-300"
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

                                        <span className="mx-auto font-medium text-bisyou-font text-xl">
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
