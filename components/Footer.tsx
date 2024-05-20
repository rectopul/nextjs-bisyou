import prisma from "@/lib/client";
import Image from "next/image";
import logo from "../public/assets/img/logo-small_large.webp";
import { FormNews } from "./FormNews";
import { Facebook } from "lucide-react";
import { Instagram, Pinterest, TikTok } from "./icons/Icons";

export default async function Footer() {
    const pages = await prisma.pages.findMany();

    return (
        <>
            <div className="w-full px-4 bg-bisyou-default md:py-10">
                <div className="w-full mx-auto max-w-bisyouContainer flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col gap-10">
                        <Image
                            src={logo}
                            width={150}
                            height={60}
                            alt="logo-bisyou"
                        />
                        <ul className="flex flex-col gap-5 font-medium text-md">
                            {pages.map((p) => (
                                <li key={`page-` + p.id}>
                                    <a
                                        className="text-bisyou-font hover:underline"
                                        href={`pages/${p.slug}`}
                                        aria-label={p.description}
                                    >
                                        {p.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-7 max-w-[300px] text-bisyou-font">
                        <h2 className="text-2xl font-normal text-bisyou-font">
                            Skin news
                        </h2>

                        <span>
                            Fique por dentro das novidades da BisYou e receba
                            dicas de skincare
                        </span>

                        <FormNews />
                    </div>

                    <div className="flex flex-col gap-10">
                        <h2 className="text-2xl font-normal text-bisyou-font">
                            Atendimento
                        </h2>
                    </div>

                    <div className="flex flex-col gap-10 text-bisyou-font">
                        <h2 className="text-2xl font-normal">
                            Segue a gente lá
                        </h2>

                        <div className="flex justify-between gap-5">
                            <a
                                href="#"
                                className="hover:text-bisyou-green"
                                aria-label="Pagina do facebook da bisyou"
                            >
                                <Facebook
                                    size={30}
                                    fill="#6e4945"
                                    strokeWidth={0}
                                />
                            </a>

                            <a
                                href="#"
                                className="hover:text-bisyou-green"
                                aria-label="Pagina do facebook da bisyou"
                            >
                                <Pinterest size={30} />
                            </a>

                            <a
                                href="#"
                                className="hover:text-bisyou-green"
                                aria-label="Pagina do facebook da bisyou"
                            >
                                <Instagram size={30} />
                            </a>

                            <a
                                href="#"
                                className="hover:text-bisyou-green"
                                aria-label="Pagina do facebook da bisyou"
                            >
                                <TikTok size={30} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
