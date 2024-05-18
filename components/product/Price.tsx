"use client";

import { Product } from "@/@types/ProductObject";
import { moneyFormat } from "@/util/moneyFormat";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface ProductPriceProps {
    product: Product;
}

export function ProductPrice({ product }: ProductPriceProps) {
    const [quantity, setQuantity] = useState<number>(1);

    const handleMinus = () => setQuantity((prev) => (prev === 1 ? 1 : --prev));
    const handlePlus = () => setQuantity((prev) => ++prev);

    const price = parseFloat(product.priceRange.maxVariantPrice.amount);
    const promotion = parseFloat(
        product.compareAtPriceRange.maxVariantPrice.amount
    );

    return (
        <>
            <div className="w-full text-bisyou-font font-semibold text-[20px]">
                {price > 0 ? (
                    <>
                        {moneyFormat(price)}{" "}
                        <span className="font-normal">
                            ou 2X {moneyFormat(price / 2)}
                        </span>
                    </>
                ) : (
                    <>
                        {moneyFormat(promotion)}{" "}
                        <span className="font-normal">
                            ou 2X {moneyFormat(promotion / 2)}
                        </span>
                    </>
                )}
            </div>

            <div className="w-full flex items-center gap-3 mt-4">
                <div className="px-4 h-[50px] py-1 bg-slate-100 rounded-full border border-bisyou-gray flex items-center text-bisyou-font text-opacity-80">
                    <button className="hover:text-black" onClick={handleMinus}>
                        <Minus size={16} strokeWidth={2} />
                    </button>

                    <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="outline-none border-none text-center mx-8 p-2 w-10 bg-transparent"
                    />

                    <button className="hover:text-black" onClick={handlePlus}>
                        <Plus size={16} strokeWidth={2} />
                    </button>
                </div>

                <button className="bg-bisyou-green hover:bg-opacity-70 text-white flex-1 h-[50px] rounded-full">
                    Comprar
                </button>
            </div>
        </>
    );
}
