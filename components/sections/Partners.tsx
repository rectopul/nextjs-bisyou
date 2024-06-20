"use client";

import { Partners, Settings } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface PartnersProps {
    settings: Settings;
    partners: Partners[];
}

export function SectionPartners({ partners, settings }: PartnersProps) {
    const [partnersText, setPartnersText] = useState<string | null>(
        partners[0].text
    );

    return (
        <>
            <div className="w-full px-4 xl:py-[40px] bg-bisyou-secondary">
                <div className="w-full max-w-bisyouContainerHome mx-auto">
                    <div className="w-full flex flex-col gap-4 xl:gap-14 text-bisyou-font text-center">
                        <h2 className="text-bisyou-font text-cltitle font-semibold text-center mx-auto">
                            {settings.section_partners_title}
                        </h2>

                        <p className="xl:w-[70%] mx-auto font-normal text-hd-4">
                            {partnersText}
                        </p>
                    </div>
                </div>

                <div className="w-full flex px-6 gap-5 my-[40px] justify-between items-center">
                    {partners.map((p) => (
                        <div
                            key={`ptn-${p.id}`}
                            onClick={() => setPartnersText(p.text)}
                            className="hover:opacity-100 opacity-25 cursor-pointer"
                        >
                            <Image
                                alt={p.alt}
                                width={207}
                                height={207}
                                src={"/file/" + p.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
