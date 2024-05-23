import { ProductMedia } from "@/@types/shopify/ProductWithMedia";
import Image from "next/image";

interface ProductVideo {
    media: ProductMedia;
}

export function ProductVideo({ media }: ProductVideo) {
    return (
        <>
            <div className="w-full h-full overflow-hidden flex justify-center items-center rounded-xl">
                {media.previewImage && media.previewImage.url && (
                    <>
                        <iframe
                            width="560"
                            className="w-full h-full"
                            height="315"
                            src={media.embedUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        ;
                    </>
                )}
            </div>
        </>
    );
}
