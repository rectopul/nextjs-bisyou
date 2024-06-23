"use client";

import { discountCalculator } from "@/util/discountCalculator";
import Image from "next/image";
import { ProductItemSumary } from "./item/Sumary";
import { Shopify } from "@/@types/shopify";

interface ProductItemProps {
    product: Shopify.Products;
    variant?: "spacing" | "default" | "list" | "grid";
}

export function ProductItem({ product, variant }: ProductItemProps) {
    const price = parseFloat(product.priceRange.maxVariantPrice.amount);
    const compare = parseFloat(
        product.compareAtPriceRange.maxVariantPrice.amount
    );

    return (
        <>
            <div
                data-variant={variant}
                className="w-full h-full animate-in fade-in-0 duration-500 data-[variant=list]:fade-in-100  data-[variant=spacing]:px-10 flex justify-center bg-white pb-2 rounded-b-lg"
            >
                <div
                    data-variant={variant}
                    className="w-full h-full data-[variant=list]:grid md:data-[variant=list]:grid-cols-[170px_auto] flex flex-col gap-2 data-[variant=spacing]:xl:max-w-[300px] rounded-md overflow-hidden"
                >
                    <figure className="w-full relative">
                        <span
                            data-variant={variant}
                            className="absolute data-[variant=list]:text-xs rounded-full left-3 top-3 px-4 py-1 bg-bisyou-yellow text-bisyou-font font-semibold text-sm"
                        >
                            {product.variants?.edges?.at(-1)?.node.title}
                        </span>

                        <span
                            data-variant={variant}
                            className="absolute data-[variant=list]:text-xs rounded-full left-3 bottom-3 px-4 py-1 bg-bisyou-yellow text-bisyou-font font-semibold text-sm"
                        >
                            {discountCalculator(compare, price)}% OFF
                        </span>

                        <Image
                            width={300}
                            height={300}
                            src={product.featuredImage.url}
                            className="max-sm:w-full w-full"
                            alt={
                                product.featuredImage.altText || product.handle
                            }
                        />
                    </figure>

                    <ProductItemSumary product={product} variant={variant} />
                </div>
            </div>
        </>
    );
}
