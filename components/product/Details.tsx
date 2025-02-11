"use client";

import { Product } from "@/@types/ProductObject";
import { moneyFormat } from "@/util/moneyFormat";
import { Minus, Plus } from "lucide-react";
import { ProductPrice } from "./Price";
import { useState } from "react";

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const [expanded, setExpanded] = useState(false);
    const truncatedDescription = product.descriptionHtml
        .split(" ")
        .slice(0, 100)
        .join(" ");
    const displayDescription = expanded
        ? product.descriptionHtml
        : truncatedDescription;

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <div className="w-full flex flex-col gap-8 max-lg:mt-5 xl:pl-10">
                <h2 className="text-xl font-medium text-bisyou-font uppercase">
                    {product.title}
                </h2>

                <div className="font-normal text-xl text-bisyou-secondaryText">
                    Indicado para peles delicadas
                </div>

                <div className="flex gap-2 items-center">
                    {product.tags.map((i, k) => (
                        <span
                            key={`tag-${k}`}
                            className="bg-bisyou-yellow text-bisyou-font font-medium text-sm px-3 py-1 rounded-full"
                        >
                            {i}
                        </span>
                    ))}
                </div>

                <div className="w-full flex flex-col gap-2 descriptionProduct">
                    <h4 className="text-bisyou-font flex items-center justify-between font-medium text-[20px] w-full border-b border-bisyou-font">
                        Descrição
                        {/* Condicionalmente mostrar o botão "Leia Mais" */}
                        <button
                            className="text-red-500 text-sm"
                            onClick={toggleExpanded}
                        >
                            {!expanded &&
                            product.descriptionHtml.split(" ").length > 100
                                ? "Ver mais"
                                : "Ver menos"}
                        </button>
                    </h4>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: displayDescription,
                        }}
                        className="text-[14px] text-bisyou-font text-opacity-60 pl-3"
                    ></span>
                </div>

                <ProductPrice product={product} />

                <div className="px-8 mt-4 py-2 bg-bisyou-yellow text-bisyou-font text-center rounded-full font-semibold">
                    frete grátis acima de R$ 129 | frete fixo de R$ 19,90
                </div>
            </div>
        </>
    );
}
