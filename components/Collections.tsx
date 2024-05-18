"use client";

import { Products } from "@/@types/ProductsCollection";

interface CollectionProps {
    products: Products;
}

export function CollecTion({ products }: CollectionProps) {
    return (
        <>
            {products.edges.map((p) => (
                <div>{p.node.title}</div>
            ))}
        </>
    );
}
