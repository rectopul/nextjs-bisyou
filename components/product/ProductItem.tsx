import { ProductNode } from "@/@types/CollectionInProduct";
import { discountCalculator } from "@/util/discountCalculator";
import { moneyFormat } from "@/util/moneyFormat";
import { Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface ProductItemProps {
    product: ProductNode;
    variant?: "spacing" | "default";
}

export function ProductItem({ product, variant }: ProductItemProps) {
    return (
        <>
            <div
                data-variant={variant}
                className="w-full data-[variant=spacing]:px-10 flex justify-center bg-white"
            >
                <div
                    data-variant={variant}
                    className="flex flex-col gap-2   data-[variant=spacing]:max-w-[300px] rounded-md overflow-hidden"
                >
                    <figure className="w-full relative">
                        <span className="absolute rounded-full left-3 top-3 px-4 py-1 bg-bisyou-yellow text-bisyou-font font-semibold text-sm">
                            {
                                product.node.options[
                                    product.node.options.length - 1
                                ].values[0]
                            }
                        </span>

                        <span className="absolute rounded-full left-3 bottom-3 px-4 py-1 bg-bisyou-yellow text-bisyou-font font-semibold text-sm">
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
                            alt={product.node.featuredImage.altText}
                        />
                    </figure>

                    <div className="p-2 flex flex-col gap-2 text-center">
                        <h3
                            data-small={
                                product.node.title.length > 50 ? true : false
                            }
                            className="font-medium h-[60px] data-[small=true]:text-[14px] data-[small=true]:tracking-tight text-black text-[18px] text-center"
                        >
                            {product.node.title}
                        </h3>

                        <div className="flex items-center justify-center w-full text-center text-[15px] text-slate-400 font-medium">
                            De{" "}
                            <del className="ml-2">
                                {moneyFormat(
                                    parseFloat(
                                        product.node.compareAtPriceRange
                                            .maxVariantPrice.amount
                                    )
                                )}
                            </del>
                            <span className="bg-red-600 ml-2 text-white px-3 text-xs font-semibold py-[5px] rounded-full">
                                -
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
                        </div>

                        <div className="text-bisyou-green font-medium text-[18px]">
                            Por{" "}
                            {moneyFormat(
                                parseFloat(
                                    product.node.priceRange.maxVariantPrice
                                        .amount
                                )
                            )}
                            <span className="ml-2 text-[15px] text-slate-400 font-normal">
                                ou 5x de{" "}
                                {moneyFormat(
                                    parseFloat(
                                        product.node.priceRange.maxVariantPrice
                                            .amount
                                    ) / 5
                                )}
                            </span>
                        </div>

                        <div className="w-full flex items-center gap-1">
                            <a
                                href={`/product/${product.node.handle}`}
                                className="flex-1 text-center flex hover:bg-opacity-80 justify-center items-center rounded-l-full h-[45px] bg-bisyou-green text-white"
                            >
                                Conhecer
                            </a>
                            <button className="w-16 h-[45px] flex hover:bg-opacity-80 justify-center items-center bg-bisyou-greenBlack rounded-r-full text-white">
                                <Plus size={15} className="mr-1" />
                                <ShoppingBag size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
