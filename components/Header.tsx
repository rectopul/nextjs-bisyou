"use client";

import Image from "next/image";

export function Header() {
    return (
        <>
            <div className="w-full bg-bisyou-default py-3">
                <div className="w-full max-w-bisyouContainer mx-auto">
                    <ul className="flex justify-between gap-7 text-sm w-full">
                        <li>FRETE GRÁTIS EM COMPRAS A PARTIR DE R$249</li>
                        <li>PAGUE EM ATÉ 5X SEM JUROS</li>
                        <li>ENTREGA SUPER EXPRESSA SP CAPITAL</li>
                        <li>10% OFF NO PIX</li>
                    </ul>
                </div>
            </div>

            <div className="w-full max-w-bisyouContainer mx-auto py-6 text-center flex justify-center">
                <img src="https://placehold.co/150x100" alt="bistou" />
            </div>

            <div className="w-full mx-auto bg-bisyou-gray">
                <div className="w-full max-w-bisyouContainer mx-auto py-4">
                    <ul className="flex justify-between gap-10 font-normal text-[14px]">
                        <li>
                            <a
                                href="#"
                                className="hover:underline text-bisyou-font"
                            >
                                HOME
                            </a>
                        </li>
                        <li className="font-medium">
                            <a
                                href="#"
                                className="hover:underline text-bisyou-font font-semibold"
                            >
                                NECESSIDADE
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline text-bisyou-font"
                            >
                                TIPO DE PELE
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline text-bisyou-font"
                            >
                                KITS
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline text-bisyou-font"
                            >
                                SOMOS A BISYOU
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline text-bisyou-font"
                            >
                                BLOG
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline text-bisyou-font"
                            >
                                RASTREADOR
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline text-bisyou-font"
                            >
                                PARCERIAS
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline text-bisyou-font"
                            >
                                LOJAS
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
