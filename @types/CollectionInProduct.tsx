import { Shopify } from "./shopify";

export interface CollectionInProduct {
    edges: CollectionEdge[];
}

export interface CollectionEdge {
    node: ColectionNode;
}

export interface ColectionNode {
    title: string;
    handle: string;
    products: Products;
}

export interface Products {
    edges: ProductNode[];
}

export interface ProductNode {
    node: Shopify.Products;
}

export interface SimpleNode {
    availableForSale: boolean;
    title: string;
    description: string;
    id: string;
    handle: string;
    featuredImage: FeaturedImage;
    priceRange: PriceRange;
    compareAtPriceRange: CompareAtPriceRange;
    options: ProductOptions[];
}

export interface ProductOptions {
    id: string;
    name: string;
    values: string[];
}

export interface FeaturedImage {
    altText: any;
    width: number;
    height: number;
    id: string;
    thumbnail: string;
    url: string;
}

export interface PriceRange {
    maxVariantPrice: MaxVariantPrice;
}

export interface MaxVariantPrice {
    amount: string;
}

export interface CompareAtPriceRange {
    maxVariantPrice: MaxVariantPrice2;
}

export interface MaxVariantPrice2 {
    amount: string;
}
