"use client";

import { Shopify } from "@/@types/shopify";
import { moneyFormat } from "@/util/moneyFormat";
import { discountCalculator } from "@/util/discountCalculator";
import { BuyButton } from "../BuyButton";

interface ProductItemSumary {
    product: Shopify.Products;
    variant?: "spacing" | "default" | "list" | "grid" | false | null;
    hasQuick?: boolean;
}

export function ProductItemSumary({
    product,
    variant,
    hasQuick = false,
}: ProductItemSumary) {
    const price = parseFloat(product.priceRange.maxVariantPrice.amount);
    const comparePrice = parseFloat(
        product.compareAtPriceRange.maxVariantPrice.amount
    );

    return (
        <>
            <div
                data-variant={variant || "default"}
                className="p-2 flex h-full flex-col justify-end gap-2 text-center data-[variant=list]:text-start group/item"
            >
                <h3
                    data-small={product.title.length > 50 ? true : false}
                    data-variant={variant || "default"}
                    className="font-medium h-auto mb-auto data-[small=true]:text-[14px] data-[small=true]:tracking-tight text-black text-sm md:text-[18px] data-[variant=list]:text-start text-center"
                >
                    {product.title}
                </h3>

                <div
                    data-variant={variant || "default"}
                    className="flex items-center max-md:flex max-md:flex-col data-[variant=list]:justify-start justify-center w-full text-center text-[15px] text-slate-400 font-light"
                >
                    <span>
                        De{" "}
                        <del className="ml-2">{moneyFormat(comparePrice)}</del>
                    </span>
                    <span className="bg-red-600 ml-2 font-light text-white px-3 text-xs py-[5px] rounded-full">
                        -{discountCalculator(comparePrice, price)}% OFF
                    </span>
                </div>

                <div className="text-bisyou-green font-light text-[18px]">
                    Por {moneyFormat(price)}
                    <span className="ml-2 text-[15px] text-slate-400 font-light">
                        ou 5x de {moneyFormat(price / 5)}
                    </span>
                </div>
                <BuyButton
                    handle={product.handle}
                    id={product.id}
                    size={variant}
                    product={product}
                    hasQuick={hasQuick}
                />
            </div>
        </>
    );
}
