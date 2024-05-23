"use client";

import { YoutubeIcon } from "@/components/icons/Icons";
import Image from "next/image";
import { useState } from "react";

export function YouTubePlayer({ id, url }: { url: string; id: string }) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
    };
    const thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

    return (
        <div className="w-full h-full overflow-hidden flex justify-center items-center rounded-xl relative">
            {isVideoLoaded ? (
                <iframe
                    width="560"
                    className="w-full h-full"
                    height="315"
                    src={url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            ) : (
                <div
                    className="w-full h-full cursor-pointer"
                    onClick={handleVideoLoad}
                >
                    <Image
                        src={thumbnail}
                        alt="Video preview"
                        width={600}
                        height={480}
                        className="rounded-xl w-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            className="p-2 rounded-full hover:opacity-60 z-10"
                            onClick={handleVideoLoad}
                        >
                            <YoutubeIcon
                                fill="#FF0000"
                                className="hover:!fill-white"
                                size={60}
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
