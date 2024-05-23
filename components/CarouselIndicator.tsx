import React, { useEffect, useState } from "react";
import { type CarouselApi } from "./ui/carousel";
import { Button } from "./ui/button";

interface CarouselIndicatorProps {
    api: CarouselApi;
    length: number;
    listItems?: {
        image?: string;
        content: React.ReactNode;
    }[];
}

export function CarouselIndicator({
    api,
    length,
    listItems,
}: CarouselIndicatorProps) {
    const [current, setCurrent] = useState(0);

    const handleSetIndicator = (i: number) => {
        api && api.scrollTo(i);
    };

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <>
            <div className="w-full flex items-center justify-center gap-3">
                {Array.from({ length }, (_, i) => (
                    <Button
                        data-active={current === i ? true : false}
                        onClick={() => handleSetIndicator(i)}
                        key={`ind-crl-${i}`}
                        className="w-3 h-3 rounded-full p-0 bg-bisyou-font data-[active=true]:bg-red-600 hover:bg-red-600"
                    >
                        {listItems && listItems[i] && (
                            <>{listItems[i].content}</>
                        )}
                    </Button>
                ))}
            </div>
        </>
    );
}
