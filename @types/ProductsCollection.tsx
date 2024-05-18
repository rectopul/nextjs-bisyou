export interface ProductCollectionObject {
    data: Data;
}

export interface Data {
    collection: Collection;
}

export interface Collection {
    id: string;
    title: string;
    products: Products;
}

export interface Products {
    edges: Edge[];
}

export interface Edge {
    node: ProductNode;
}

export interface ProductNode {
    id: string;
    title: string;
    availableForSale: boolean;
    description: string;
    priceRange: PriceRange;
    compareAtPriceRange: CompareAtPriceRange;
    handle: string;
    featuredImage: FeaturedImage;
    images: ProductImages;
    variants: Variants;
    options: Option[];
}

export interface PriceRange {
    maxVariantPrice: MaxVariantPrice;
    minVariantPrice: MinVariantPrice;
}

export interface MaxVariantPrice {
    amount: string;
    currencyCode: string;
}

export interface MinVariantPrice {
    amount: string;
    currencyCode: string;
}

export interface CompareAtPriceRange {
    maxVariantPrice: MaxVariantPrice2;
    minVariantPrice: MinVariantPrice2;
}

export interface MaxVariantPrice2 {
    amount: string;
    currencyCode: string;
}

export interface MinVariantPrice2 {
    amount: string;
    currencyCode: string;
}

export interface FeaturedImage {
    altText: any;
    height: number;
    id: string;
    url: string;
    width: number;
}

export interface ProductImages {
    edges: Edge2[];
}

export interface Edge2 {
    node: ProductImageNode;
}

export interface ProductImageNode {
    altText: any;
    width: number;
    height: number;
    url: string;
}

export interface Variants {
    edges: Edge3[];
}

export interface Edge3 {
    cursor: string;
    node: Node3;
}

export interface Node3 {
    id: string;
    title: string;
    availableForSale: boolean;
    metafield: any;
    image: Image;
    compareAtPrice: CompareAtPrice;
    price: Price;
}

export interface Image {
    altText: any;
    height: number;
    id: string;
    url: string;
    width: number;
}

export interface CompareAtPrice {
    amount: string;
    currencyCode: string;
}

export interface Price {
    amount: string;
    currencyCode: string;
}

export interface Option {
    id: string;
    name: string;
    values: string[];
    __typename: string;
}
