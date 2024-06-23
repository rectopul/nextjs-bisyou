import prisma from "@/lib/client";
import Image from "next/image";
import logo from "../public/assets/img/logo-small_large.webp";
import { FormNews } from "./FormNews";
import { Facebook } from "lucide-react";
import { FacebookIcon, Instagram, Pinterest, TikTok } from "./icons/Icons";
import { CardSelect } from "./CardSelect";

export default async function Footer() {
    const pages = await prisma.pages.findMany();
    const settings = await prisma.settings.findFirst();

    if (!settings || !settings.shopping_cards) return;

    const cards = settings.shopping_cards.split(";");

    return (
        <>
            <div className="w-full px-4 bg-bisyou-default py-10">
                <div className="w-full mx-auto max-w-bisyouContainer max-sm:gap-5 flex flex-col md:flex-row justify-between">
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
                                        aria-label={
                                            p.description ? p.description : ""
                                        }
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

                        <ul className="flex flex-col gap-5 font-medium text-md">
                            <li>
                                <a
                                    className="text-bisyou-font hover:underline"
                                    href="/onde-encontrar"
                                    aria-label="onde encontrar"
                                >
                                    Onde encontrar
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-10 text-bisyou-font">
                        <h2 className="text-2xl font-normal">
                            Segue a gente lá
                        </h2>

                        <div className="flex xl:justify-between gap-5">
                            <a
                                href="#"
                                className="hover:text-bisyou-green"
                                aria-label="Pagina do facebook da bisyou"
                            >
                                <FacebookIcon size={30} />
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

                <div className="w-full mx-auto max-w-bisyouContainer max-sm:gap-5 mt-4 pt-4 border-t text-bisyou-font border-bisyou-font flex flex-col md:flex-row justify-between xl:items-center">
                    <div>© 2024 Bisyou. Todos os direitos reservados</div>

                    <div className="flex justify-end gap-4">
                        {cards.map((c, k) => (
                            <CardSelect brand={c} key={`card-sttngs-${k}`} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
