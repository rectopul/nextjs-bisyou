"use client";

import { Plus, ShoppingBag } from "lucide-react";

interface BuyButtonProps {
    handle: string;
    id: string;
    size?: "spacing" | "default" | "list" | "grid" | false | null;
}

export function BuyButton({ handle, id, size }: BuyButtonProps) {
    return (
        <>
            <div
                data-size={size}
                className="w-full data-[size=small]:max-w-[250px] data-[size=list]:max-w-[250px] md:mt-auto flex items-center gap-1"
            >
                <a
                    href={`/product/${handle}`}
                    data-size={size}
                    className="flex-1 data-[size=grid]:text-xs text-center flex hover:bg-opacity-80 justify-center items-center rounded-l-full h-[45px] max-md:data-[size=grid]:h-9 bg-bisyou-green text-white"
                >
                    Conhecer
                </a>
                <div
                    data-size={size}
                    className="w-16 h-[45px] max-md:data-[size=grid]:w-14 max-md:data-[size=grid]:h-9 hover:w-[45px] overflow-hidden transition-all duration-300 hover:rounded-l-full flex hover:bg-opacity-80 justify-center items-center rounded-r-full text-white"
                >
                    <button className="w-full h-full group flex hover:bg-opacity-80 justify-center items-center bg-bisyou-greenBlack text-white">
                        <Plus
                            size={15}
                            className="mr-1 group-hover:mr-0 group-hover:hidden"
                        />
                        <ShoppingBag size={16} className="" />
                    </button>
                </div>
            </div>
        </>
    );
}
