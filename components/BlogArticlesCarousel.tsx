"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import Image from "next/image";
import { BlogObject } from "@/@types/shopify/BlogObject";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { CarouselIndicator } from "./CarouselIndicator";
import { title } from "process";

interface BlogArticlesCarouselProps {
    blogObject: BlogObject;
}

export function BlogArticlesCarousel({
    blogObject,
}: BlogArticlesCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    const handleNext = () => {
        api && api.scrollNext();
    };
    const handlePrev = () => {
        api && api.scrollPrev();
    };

    return (
        <>
            <div className="w-full bg-bisyou-secondary py-10 mt-[40px]">
                <div className="w-full max-w-bisyouContainer mx-auto my-10 flex-col xl:flex-row items-center max-md:px-4">
                    <h2 className="text-bisyou-font text-xl xl:text-2xl font-medium">
                        Últimas do blog{" "}
                        <span className="xl:ml-2 text-bisyou-default font-normal text-sm xl:text-xl">
                            tendências e novidades
                        </span>
                    </h2>

                    <Link
                        href="/blog"
                        className="ml-auto max-md:block max-md:mt-3 font-semibold text-bisyou-font hover:underline"
                    >
                        Ver todos
                    </Link>
                </div>

                <div className="w-ful flex justify-start mx-auto overflow-hidden relative">
                    <div className="w-full flex-[100%] xl:-mx-[10%] ml-auto px-4 my-6">
                        <Carousel
                            setApi={setApi}
                            opts={{
                                loop: true,
                                align: "start",
                            }}
                            plugins={[plugin.current]}
                        >
                            <CarouselContent>
                                {blogObject.data.blog.articles.edges.map(
                                    (a) => (
                                        <CarouselItem
                                            key={`article-hm-${a.node.id}`}
                                            className="xl:basis-1/4 pb-[25px]"
                                        >
                                            <div className="border-2 border-bisyou-font rounded-xl flex flex-col gap-6 relative overflow-hidden">
                                                <figure className="flex justify-center items-center gap-2 text-bisyou-default">
                                                    <Image
                                                        src={
                                                            a.node.image
                                                                .thumbnail
                                                        }
                                                        alt={
                                                            a.node.image
                                                                .altText ||
                                                            a.node.handle
                                                        }
                                                        width={520}
                                                        height={210}
                                                        className="w-full"
                                                    />
                                                </figure>

                                                <div className="w-full px-6 flex flex-col gap-3 pb-6">
                                                    <h2 className="font-semibold w-full min-h-[64px] text-2xl text-bisyou-font text-start mx-auto">
                                                        {a.node.title}
                                                    </h2>

                                                    <div
                                                        className="text-bisyou-font font-normal xl:min-h-[80px] text-sm text-start"
                                                        dangerouslySetInnerHTML={{
                                                            __html: a.node
                                                                .excerptHtml,
                                                        }}
                                                    ></div>

                                                    <Link
                                                        href={`/article/${a.node.handle}`}
                                                        aria-label={`ver mais conteudo dobre ${a.node.title}`}
                                                        className="bg-bisyou-yellow mt-3 self-start text-bisyou-font text-sm font-semibold py-1 px-4 rounded-full"
                                                    >
                                                        Ver mais
                                                    </Link>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    )
                                )}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <Button
                        variant="bisCarousel"
                        onClick={handleNext}
                        className="rounded-full w-[50px] h-[50px] p-0 absolute right-2 xl:right-32 top-[50%] -translate-y-[50px]"
                    >
                        <ChevronRight size={30} strokeWidth={1} />
                    </Button>

                    <Button
                        variant="bisCarousel"
                        onClick={handlePrev}
                        className="rounded-full w-[50px] h-[50px] p-0 absolute left-2 xl:left-32 top-[50%] -translate-y-[50px]"
                    >
                        <ChevronLeft size={30} strokeWidth={1} />
                    </Button>
                </div>
                {api && (
                    <CarouselIndicator
                        api={api}
                        length={blogObject.data.blog.articles.edges.length}
                    />
                )}
            </div>
        </>
    );
}
