"use client";

import algoliasearch from "algoliasearch/lite";
import { Product } from "@/@types/ProductObject";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { moneyFormat } from "@/util/moneyFormat";
import { SimpleHit } from "./search/SimpleHit";
import React, { useRef, useState } from "react";
import { RefinementList, InstantSearch } from "react-instantsearch";
import { client } from "@/agnolia";
import { CustomRefinementList } from "./CustomRefinementList";

interface HitResultProps {
    hit: any;
}

const searchClient = algoliasearch(
    "9HPWH7L3DV",
    "22c1df07ad58656478a1771519881920",
    { queryParameters: { title: "kit" } }
);
const index = searchClient.initIndex("shopify_products");

function HitContainer({
    hits,
    onClickSugestions,
}: {
    hits: any[];
    onClickSugestions: (data: string) => void;
}) {
    return (
        <div className="w-full bg-white rounded-lg shadow p-4 mt-3 flex gap-4">
            <div className="flex flex-col w-2/5 text-start border-r border-slate-200 pr-3">
                <h2 className="text-sm font-semibold">Sugestões</h2>

                <div className="mt-3 flex flex-col gap-3">
                    <InstantSearch
                        searchClient={client}
                        indexName="shopify_products"
                    >
                        <CustomRefinementList
                            attribute="title"
                            limit={7}
                            classNames={{
                                item: "w-full text-slate-600 font-medim flex flex-col gap-2 p-2 hover:bg-slate-100",
                                root: "w-full text-slate-600 font-medim [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-0",
                                label: "text-xs grid grid-cols-[auto_20px] gap-2 hover:underline cursor-pointer",
                                count: "w-5 h-5 bg-slate-200 text-[10px] text-slate-900 rounded-full flex items-center justify-center font-bold",
                            }}
                            onClickSugestions={onClickSugestions}
                        />
                    </InstantSearch>
                </div>
            </div>
            <div>
                <ScrollArea className="w-full overflow-hidden flex max-h-[400px] overflow-y-auto gap-3">
                    <div className="flex flex-col h-[400px] gap-3">
                        {hits &&
                            hits.map((h) => (
                                <HitResult hit={h} key={h.objectID} />
                            ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}

function HitResult({ hit }: HitResultProps) {
    const results = hit as Product;

    const rangePrice = parseFloat(results.priceRange.maxVariantPrice.amount);
    const comparePrice = parseFloat(
        results.compareAtPriceRange.maxVariantPrice.amount
    );

    return (
        <>
            <div className="w-full grid grid-cols-[86px_auto] gap-3 mx-auto p-2 hover:bg-slate-100 rounded-sm">
                <figure>
                    <Image
                        alt={results.featuredImage.altText}
                        width={90}
                        height={90}
                        src={results.featuredImage.url}
                        className="p-1 border border-slate-200 rounded-sm"
                    />
                </figure>
                <div className="flex flex-col gap-1">
                    <h2 className="text-sm font-semibold text-slate-700 text-start">
                        <a
                            href={`/product/${results.handle}`}
                            className="text-slate-700"
                        >
                            {results.title}
                        </a>
                    </h2>

                    <div className="flex flex-col gap-1 w-full text-start">
                        <del className="text-slate-200 font-medium text-xs text-start">
                            {moneyFormat(comparePrice)}
                        </del>

                        <span className="text-slate-400 text-xs font-medium text-start">
                            por{" "}
                            <span className="text-bisyou-green">
                                {moneyFormat(rangePrice)}
                            </span>{" "}
                            ou 5X de{" "}
                            <span className="text-bisyou-green">
                                {moneyFormat(rangePrice / 5)}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export function InstantSearchBar() {
    const [results, setResults] = useState<any | null>(null);
    const ref = useRef<HTMLInputElement>(null);

    const performSearch = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault();

        const { value } = event.currentTarget;
        const { hits } = await index.search(value);

        setResults(hits);
    };

    const handleSuggestionClick = async (value: string) => {
        if (ref.current) {
            ref.current.value = value;

            // Disparar o evento de change
            const { hits } = await index.search(value);

            setResults(hits);
        }
    };

    return (
        <>
            <div className="w-full flex bg-white shadow rounded-md border border-slate-200">
                <input
                    ref={ref}
                    type="text"
                    onChange={performSearch}
                    className="w-full h-9 px-3 rounded-md outline-none"
                    placeholder="procurar produtos"
                />
            </div>

            {results && (
                <HitContainer
                    hits={results}
                    onClickSugestions={handleSuggestionClick}
                />
            )}
        </>
    );
}
