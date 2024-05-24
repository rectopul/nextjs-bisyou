"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export function AnnoncementBar() {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <div className="w-full bg-bisyou-default py-3">
            <div className="w-full max-w-bisyouContainer mx-auto text-sm font-light">
                <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
                    <CarouselContent className="justify-between">
                        <CarouselItem className="text-center xl:basis-[350px] text-sm">
                            FRETE GRÁTIS EM COMPRAS A PARTIR DE R$249
                        </CarouselItem>
                        <CarouselItem className="text-center xl:basis-[250px]">
                            PAGUE EM ATÉ 5X SEM JUROS
                        </CarouselItem>
                        <CarouselItem className="text-center xl:basis-[320px]">
                            ENTREGA SUPER EXPRESSA SP CAPITAL
                        </CarouselItem>
                        <CarouselItem className="text-center xl:basis-[140px] xl:text-end">
                            10% OFF NO PIX
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
