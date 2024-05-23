import { Partners, Settings } from "@prisma/client";
import Image from "next/image";

interface PartnersProps {
    settings: Settings;
    partners: Partners[];
}

export function SectionPartners({ partners, settings }: PartnersProps) {
    return (
        <>
            <div className="w-full px-4 xl:py-[40px] bg-bisyou-secondary">
                <div className="w-full max-w-bisyouContainerHome mx-auto">
                    <div className="w-full flex flex-col gap-4 xl:gap-14 text-bisyou-font text-center">
                        <h2 className="text-bisyou-font text-3xl font-semibold text-center mx-auto">
                            {settings.section_partners_title}
                        </h2>

                        <p className="xl:w-[70%] mx-auto">
                            {settings.section_partners}
                        </p>
                    </div>
                </div>

                <div className="w-full flex px-6 gap-5 my-[40px] justify-between items-center">
                    {partners.map((p) => (
                        <div key={`ptn-${p.id}`}>
                            <a
                                href={p.url || "#"}
                                className="hover:opacity-100 opacity-25"
                            >
                                <Image
                                    alt={p.alt}
                                    width={207}
                                    height={207}
                                    src={"/file/" + p.image}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
