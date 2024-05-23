import { ProductWithMedia } from "@/@types/shopify/ProductWithMedia";
import { moneyFormat } from "@/util/moneyFormat";
import Image from "next/image";
import { BuyButton } from "./BuyButton";

interface FeaturedModel2Props {
    product: ProductWithMedia;
    title: string;
}

export function FeaturedModel2({ product, title }: FeaturedModel2Props) {
    return (
        <>
            <div className="w-full px-4 xl:my-[40px]">
                <div className="w-full max-w-bisyouContainerHome mx-auto relative border-2 border-bisyou-default rounded-xl">
                    <div className="bg-white px-12 py-1 h-[60px] -top-[30px] left-1/2 -translate-x-1/2 absolute text-bisyou-font text-3xl font-medium">
                        {title}
                    </div>

                    <div className="w-full max-w-[840px] my-16 mx-auto h-[405px] flex justify-between gap-20">
                        <figure className="w-full max-w-[405px] relative self-start">
                            <span className="absolute top-5 left-5 bg-bisyou-yellow text-bisyou-font text-sm font-semibold rounded-full px-3 py-1">
                                {
                                    product.variants.edges[0].node
                                        .selectedOptions[0].value
                                }
                            </span>
                            <Image
                                alt={
                                    product.featuredImage.altText ||
                                    product.handle
                                }
                                width={product.featuredImage.width}
                                height={product.featuredImage.height}
                                src={product.featuredImage.url}
                                className="rounded-xl h-auto w-full"
                            />
                            <span className="absolute bottom-5 left-5 bg-bisyou-yellow text-bisyou-font text-sm font-semibold rounded-full px-3 py-1">
                                frete grátis
                            </span>
                        </figure>

                        <div className="flex flex-col gap-4 h-full">
                            <div className="text-xl font-medium text-bisyou-font">
                                {product.title}
                            </div>

                            <div className="flex w-full flex-col gap-1 pb-5 border-b-2 border-bisyou-font">
                                <del className="text-slate-400 font-medium text-sm">
                                    {moneyFormat(
                                        parseFloat(
                                            product.compareAtPriceRange
                                                .maxVariantPrice.amount
                                        )
                                    )}
                                </del>

                                <span className="text-bisyou-font text-xl font-medium">
                                    {moneyFormat(
                                        parseFloat(
                                            product.compareAtPriceRange
                                                .maxVariantPrice.amount
                                        )
                                    )}{" "}
                                    ou 5X de{" "}
                                    {moneyFormat(
                                        parseFloat(
                                            product.compareAtPriceRange
                                                .maxVariantPrice.amount
                                        ) / 5
                                    )}
                                </span>
                            </div>

                            <div className="text-slate-400 text-sm mb-3">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: product.descriptionHtml,
                                    }}
                                ></span>

                                <a
                                    href={`/product/${product.handle}`}
                                    className="mt-5 hover:underline text-bisyou-yellow block"
                                >
                                    Ver mais
                                </a>
                            </div>

                            <BuyButton
                                handle={product.handle}
                                id={product.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
