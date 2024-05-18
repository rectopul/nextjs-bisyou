export interface CollectionInProduct {
    edges: Edge[];
}

export interface Edge {
    node: Node;
}

export interface Node {
    title: string;
    products: Products;
}

export interface Products {
    edges: Edge2[];
}

export interface Edge2 {
    node: Node2;
}

export interface Node2 {
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
