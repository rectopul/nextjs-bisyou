import { ProductMedia } from "@/@types/shopify/ProductWithMedia";
import { YouTubePlayer } from "@/util/youtubePlayer";

interface ProductVideo {
    media: ProductMedia;
}

export function ProductVideo({ media }: ProductVideo) {
    if (!media.embedUrl) return null;

    const videId = media.embedUrl.split("/embed/");
    const id = String(videId.at(-1));

    return (
        <>
            <div className="w-full h-full overflow-hidden flex justify-center items-center rounded-xl">
                <YouTubePlayer id={id} url={media.embedUrl} />
            </div>
        </>
    );
}
