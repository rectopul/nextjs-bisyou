import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { ImagesSlideDefaultObject } from "@/@types/ImagesSlideDefault";
import Image from "next/image";

interface SlideImagesProps {
    images: ImagesSlideDefaultObject[];
}

export function SlideImages({ images }: SlideImagesProps) {
    return (
        <>
            <div className="w-full px-4 my-16">
                <div className="w-full max-w-bisyouContainer mx-auto">
                    <Carousel opts={{ align: "start" }}>
                        <CarouselContent>
                            {images.map((i) => (
                                <CarouselItem
                                    className="basis-1/6"
                                    key={`img-default-slide-${i.id}`}
                                >
                                    <Image
                                        src={"/file/" + i.src}
                                        alt={i.alt}
                                        width={i.width}
                                        height={i.heigth}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </>
    );
}
