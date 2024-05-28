"use client";

import { Shopify } from "@/@types/shopify";
import { BuyButton } from "./BuyButton";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityProps {
    product: Shopify.Products;
    style?: string;
}

export function Quantity({ product, style = "full" }: QuantityProps) {
    const [quantity, setQuantity] = useState<number>(1);

    const handleMinus = () => setQuantity((prev) => (prev === 1 ? 1 : --prev));
    const handlePlus = () => setQuantity((prev) => ++prev);

    return (
        <>
            <div className="w-full flex items-center gap-3 mt-4">
                <div
                    data-size={style}
                    className="px-4 data-[size=min]:max-w-[110px] h-[45px] data-[style=full]:h-[50px] py-1 bg-slate-100 rounded-full border border-bisyou-gray flex items-center text-bisyou-font text-opacity-80"
                >
                    <button className="hover:text-black" onClick={handleMinus}>
                        <Minus size={16} strokeWidth={2} />
                    </button>

                    <input
                        type="text"
                        value={quantity}
                        readOnly
                        data-size={style}
                        className="outline-none border-none font-semibold text-center data-[size=full]:mx-8 data-[size=min]:mx-[5px] p-2 data-[size=min]:p-0 data-[size=min]:max-w-[25px] data-[size=min]:text-sm w-10 bg-transparent"
                    />

                    <button className="hover:text-black" onClick={handlePlus}>
                        <Plus size={16} strokeWidth={2} />
                    </button>
                </div>

                {style !== "full" ? (
                    <BuyButton
                        handle={product.handle}
                        id={product.variants.edges[0].node.id}
                    />
                ) : (
                    <button className="bg-bisyou-green hover:bg-opacity-70 text-white flex-1 h-[50px] rounded-full">
                        Comprar
                    </button>
                )}
            </div>
        </>
    );
}
