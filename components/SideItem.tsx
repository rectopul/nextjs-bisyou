"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface SideItemProps {
    children?: React.ReactNode;
    name: string;
    link: string;
    slug: string;
}

export function SideItem({ children, name, link, slug }: SideItemProps) {
    const pathName = usePathname();
    const separatorPath = pathName.split("/");
    const currentPage = separatorPath.at(-1);

    const active = currentPage === slug ? true : false;

    return (
        <>
            {!active ? (
                <li>
                    <a className="" href={link}>
                        <button
                            className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 relative overflow-hidden active:bg-blue-gray-500/30 w-full flex items-center gap-4 px-4 capitalize"
                            type="button"
                        >
                            {children}
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                {name}
                            </p>
                        </button>
                    </a>
                </li>
            ) : (
                <li>
                    <a
                        className={active ? "active" : " "}
                        href={link}
                        aria-current="page"
                    >
                        <button
                            className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize relative overflow-hidden"
                            type="button"
                        >
                            {children}
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                {name}
                            </p>
                        </button>
                    </a>
                </li>
            )}
        </>
    );
}
