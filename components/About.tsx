import { YouTubePlayer } from "@/util/youtubePlayer";
import { Settings } from "@prisma/client";

interface AboutProps {
    settings: Settings;
}

export function About({ settings }: AboutProps) {
    const urlObj = settings.video ? new URL(settings.video) : null;
    const videoId = urlObj && urlObj.searchParams.get("v");
    const embedUrl: string | null = videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;

    return (
        <>
            <div className="w-full px-4">
                <div className="w-full max-w-bisyouContainerHome mx-auto xl:my-[40px] flex justify-between gap-14">
                    {settings.about && (
                        <div className="w-2/6 flex flex-col gap-1">
                            <div
                                className="text-bisyou-font w-full [&_ul]:pl-4 [&_li]:py-2 [&_p]:my-4 [&_h2]:text-xl [&_h2]:font-medium [&_h1]:text-2xl [&_h1]:font-semibold"
                                dangerouslySetInnerHTML={{
                                    __html: settings.about,
                                }}
                            ></div>
                            <a
                                href="#"
                                className="w-full rounded-full hover:bg-bisyou-font hover:text-white bg-bisyou-yellow text-center text-bisyou-font font-semibold text-sm py-3 mx-auto"
                            >
                                Saiba mais
                            </a>
                        </div>
                    )}

                    <div className="rounded-xl overflow-hidden h-[480px] flex-1">
                        {embedUrl && videoId && (
                            <YouTubePlayer id={videoId} url={embedUrl} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
