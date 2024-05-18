"use client";

import { ComparatorObject } from "@/@types/ProductObject";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

interface ImageToolProps {
    comparator: ComparatorObject;
}

export function ImageTool({ comparator }: ImageToolProps) {
    const images = comparator.reference.fields;

    const FIRST_IMAGE = {
        imageUrl: images[0].reference.image.url,
    };
    const SECOND_IMAGE = {
        imageUrl: images[1].reference.image.url,
    };
    return (
        <>
            <div className="w-full px-4">
                <div className="w-full max-w-bisyouContainer mx-auto flex flex-col gap-5">
                    <h2 className="font-semibold text-[20px] text-bisyou-font">
                        Antes & Depois
                    </h2>

                    <div className="overflow-hidden rounded-xl">
                        <ReactBeforeSliderComponent
                            firstImage={FIRST_IMAGE}
                            secondImage={SECOND_IMAGE}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
