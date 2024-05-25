"use client";

import { Plus, ShoppingBag } from "lucide-react";

interface BuyButtonProps {
    handle: string;
    id: string;
    size?: "small" | false | null;
}

export function BuyButton({ handle, id, size }: BuyButtonProps) {
    return (
        <>
            <div
                data-size={size}
                className="w-full data-[size=small]:max-w-[250px] mt-auto flex items-center gap-1"
            >
                <a
                    href={`/product/${handle}`}
                    className="flex-1 text-center flex hover:bg-opacity-80 justify-center items-center rounded-l-full h-[45px] bg-bisyou-green text-white"
                >
                    Conhecer
                </a>
                <div
                    data-size={size}
                    className="w-16 h-[45px] hover:w-[45px] overflow-hidden transition-all duration-300 hover:rounded-l-full flex hover:bg-opacity-80 justify-center items-center rounded-r-full text-white"
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
