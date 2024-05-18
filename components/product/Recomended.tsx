"use client";

import { CollectionInProduct } from "@/@types/CollectionInProduct";
import { Button } from "@/components/ui/button";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { discountCalculator } from "@/util/discountCalculator";
import { moneyFormat } from "@/util/moneyFormat";
import { ChevronLeft, ChevronRight, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

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
                        {collection.edges[0].node.products.edges.map((p, k) => (
                            <CarouselItem key={`prod-collection-${p.node.id}`}>
                                <div className="w-full px-10 flex justify-center">
                                    <div className="flex flex-col gap-2 max-w-[300px] rounded-md overflow-hidden">
                                        <figure className="w-full relative">
                                            <span className="absolute rounded-full left-3 top-3 px-4 py-1 bg-bisyou-yellow text-bisyou-font font-semibold text-sm">
                                                {
                                                    p.node.options[
                                                        p.node.options.length -
                                                            1
                                                    ].values[0]
                                                }
                                            </span>

                                            <span className="absolute rounded-full left-3 bottom-3 px-4 py-1 bg-bisyou-yellow text-bisyou-font font-semibold text-sm">
                                                {discountCalculator(
                                                    parseFloat(
                                                        p.node
                                                            .compareAtPriceRange
                                                            .maxVariantPrice
                                                            .amount
                                                    ),
                                                    parseFloat(
                                                        p.node.priceRange
                                                            .maxVariantPrice
                                                            .amount
                                                    )
                                                )}
                                                % OFF
                                            </span>
                                            <img
                                                src={p.node.featuredImage.url}
                                                alt={
                                                    p.node.featuredImage.altText
                                                }
                                            />
                                        </figure>

                                        <div className="p-2 flex flex-col gap-2 text-center">
                                            <h3 className="font-medium text-black text-[18px] text-center">
                                                {p.node.title}
                                            </h3>

                                            <div className="flex items-center justify-center w-full text-center text-[15px] text-slate-400 font-medium">
                                                De{" "}
                                                <del className="ml-2">
                                                    {moneyFormat(
                                                        parseFloat(
                                                            p.node
                                                                .compareAtPriceRange
                                                                .maxVariantPrice
                                                                .amount
                                                        )
                                                    )}
                                                </del>
                                                <span className="bg-red-600 ml-2 text-white px-3 text-xs font-semibold py-[5px] rounded-full">
                                                    -
                                                    {discountCalculator(
                                                        parseFloat(
                                                            p.node
                                                                .compareAtPriceRange
                                                                .maxVariantPrice
                                                                .amount
                                                        ),
                                                        parseFloat(
                                                            p.node.priceRange
                                                                .maxVariantPrice
                                                                .amount
                                                        )
                                                    )}
                                                    % OFF
                                                </span>
                                            </div>

                                            <div className="text-bisyou-green font-medium text-[18px]">
                                                Por{" "}
                                                {moneyFormat(
                                                    parseFloat(
                                                        p.node.priceRange
                                                            .maxVariantPrice
                                                            .amount
                                                    )
                                                )}
                                                <span className="ml-2 text-[15px] text-slate-400 font-normal">
                                                    ou 5x de{" "}
                                                    {moneyFormat(
                                                        parseFloat(
                                                            p.node.priceRange
                                                                .maxVariantPrice
                                                                .amount
                                                        ) / 5
                                                    )}
                                                </span>
                                            </div>

                                            <div className="w-full flex items-center gap-1">
                                                <a
                                                    href={`/products/${p.node.handle}`}
                                                    className="flex-1 text-center flex hover:bg-opacity-80 justify-center items-center rounded-l-full h-[45px] bg-bisyou-green text-white"
                                                >
                                                    Conhecer
                                                </a>
                                                <button className="w-16 h-[45px] flex hover:bg-opacity-80 justify-center items-center bg-bisyou-greenBlack rounded-r-full text-white">
                                                    <Plus
                                                        size={15}
                                                        className="mr-1"
                                                    />
                                                    <ShoppingBag size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
