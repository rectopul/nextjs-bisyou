"use client";

import { Star } from "lucide-react";
import { Button } from "../ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const avaliationTest = {
    ratting: 5,
    name: "Renata Simões",
    description: `Não vi uma ferramenta tão inovadora assim há muito tempo, já não tenho mais o trabalho que tinha antes
    para importar reviews em minhas lojas, é impressionante`,
};

export function Avaliation() {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <>
            <div className="w-full px-4 my-10">
                <div className="w-full max-w-bisyouContainer mx-auto flex flex-col gap-10">
                    <Button className="bg-bisyou-font text-bisyou-yellow font-medium text-lg w-[300px] max-w-[300px] h-14 py-4 rounded-full mx-auto">
                        escreva sua avaliação
                    </Button>
                </div>
            </div>

            <div className="w-full px-4 my-6">
                <Carousel
                    opts={{
                        loop: true,
                        align: "start",
                    }}
                    plugins={[plugin.current]}
                >
                    <CarouselContent>
                        {Array.from({ length: 10 }, (_, i) => (
                            <CarouselItem
                                key={`review-cp-${i}`}
                                className="basis-1/4 pb-[25px]"
                            >
                                <div className="border-2 border-bisyou-font rounded-md p-6 flex flex-col gap-6 relative">
                                    <div className="flex justify-center items-center gap-2 text-bisyou-default">
                                        {Array.from(
                                            { length: avaliationTest.ratting },
                                            (_, s) => (
                                                <span key={`rat-r-${i}-s-${s}`}>
                                                    <Star fill="#f2d5cf" />
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <div className="text-bisyou-font font-normal text-sm text-center">
                                        {avaliationTest.description}
                                    </div>

                                    <h2 className="font-semibold mb-6 text-xl text-bisyou-font text-center mx-auto">
                                        {avaliationTest.name}
                                    </h2>

                                    <span className="absolute -bottom-[25px] left-[50%] -translate-x-[50%] w-[50px] h-[50px] rounded-full border-2 border-bisyou-font overflow-hidden">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0572/8036/4640/files/Bisyou_02_720x_f10db7b7-8cd4-46c0-8554-7b0698c9763c_1000x.webp?v=1715999369"
                                            alt="product"
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    );
}
