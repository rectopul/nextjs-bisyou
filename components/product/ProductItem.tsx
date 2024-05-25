"use client";

import { ProductNode } from "@/@types/CollectionInProduct";
import { discountCalculator } from "@/util/discountCalculator";
import Image from "next/image";
import { ProductItemSumary } from "./item/Sumary";
import { Shopify } from "@/@types/shopify";

interface ProductItemProps {
    product: ProductNode;
    variant?: "spacing" | "default" | "list" | "grid";
}

export function ProductItem({ product, variant }: ProductItemProps) {
    return (
        <>
            <div
                data-variant={variant}
                className="w-full animate-in fade-in-0 duration-500 data-[variant=list]:fade-in-100  data-[variant=spacing]:px-10 flex justify-center bg-white"
            >
                <div
                    data-variant={variant}
                    className="w-full data-[variant=list]:grid md:data-[variant=list]:grid-cols-[170px_auto] flex flex-col gap-2 data-[variant=spacing]:xl:max-w-[300px] rounded-md overflow-hidden"
                >
                    <figure className="w-full relative">
                        <span
                            data-variant={variant}
                            className="absolute data-[variant=list]:text-xs rounded-full left-3 top-3 px-4 py-1 bg-bisyou-yellow text-bisyou-font font-semibold text-sm"
                        >
                            {
                                product.node.options[
                                    product.node.options.length - 1
                                ].values[0]
                            }
                        </span>

                        <span
                            data-variant={variant}
                            className="absolute data-[variant=list]:text-xs rounded-full left-3 bottom-3 px-4 py-1 bg-bisyou-yellow text-bisyou-font font-semibold text-sm"
                        >
                            {discountCalculator(
                                parseFloat(
                                    product.node.compareAtPriceRange
                                        .maxVariantPrice.amount
                                ),
                                parseFloat(
                                    product.node.priceRange.maxVariantPrice
                                        .amount
                                )
                            )}
                            % OFF
                        </span>
                        <Image
                            width={300}
                            height={300}
                            src={product.node.featuredImage.url}
                            className="max-sm:w-full"
                            alt={
                                product.node.featuredImage.altText ||
                                product.node.handle
                            }
                        />
                    </figure>

                    <ProductItemSumary
                        product={product.node as unknown as Shopify.Products}
                        variant={variant}
                    />
                </div>
            </div>
        </>
    );
}
