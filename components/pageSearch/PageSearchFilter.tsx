"use client";

import { Shopify } from "@/@types/shopify";
import { SearchFilter } from "./Filter";
import { ProductList } from "./ProductList";
import { useState } from "react";
import { getCollectionsByMetafields } from "@/shopify";

interface PageSearchFilterProps extends Shopify.CollectionSinge {
    props: Shopify.MetaObjects.MetaObjectEdge[][];
    categories: Shopify.ProductCategory[];
}

interface FilterChangeProps {
    type: string;
    key: string;
    value: string;
}

export function PageSearchFilter({
    categories,
    props,
    data,
}: PageSearchFilterProps) {
    const [productsFilter, setProductsFilter] = useState<
        Shopify.Products[] | null
    >(null);

    const handleGetProductsByFilter = async (data: FilterChangeProps[]) => {
        const filtred = await getCollectionsByMetafields({ filters: data });

        filtred && setProductsFilter(filtred);
    };

    return (
        <div className="relative  w-ful mx-auto max-w-bisyouContainerHome grid grid-cols-1 md:grid-cols-[300px_auto] gap-5 md:gap-14">
            <SearchFilter
                categories={categories}
                props={props}
                onFilterChange={handleGetProductsByFilter}
            />

            <div className="flex flex-col">
                <ProductList data={data} filtred={productsFilter} />
            </div>
        </div>
    );
}
