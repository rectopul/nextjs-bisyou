import { MiniBanners, MiniBannersImages } from "@prisma/client";
import Image from "next/image";

export interface MiniBannerExt extends MiniBanners {
    image: MiniBannersImages | null;
}

interface MiniBannerProps {
    miniBanner: MiniBannerExt;
}

export function MiniBanner({ miniBanner }: MiniBannerProps) {
    if (!miniBanner.image) return false;

    return (
        <>
            <div className="w-full px-4 my-[40px]">
                <div className="w-full max-w-bisyouContainerHome mx-auto">
                    <a href={miniBanner.url} aria-label={miniBanner.slug}>
                        <Image
                            alt={miniBanner.image.alt}
                            width={1200}
                            height={100}
                            src={"/file/" + miniBanner.image.src}
                        />
                    </a>
                </div>
            </div>
        </>
    );
}
