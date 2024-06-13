export interface ProductByTerm {
    data: Data;
    extensions: Extensions;
}

export interface Data {
    products: Products;
}

export interface Products {
    edges: Edge[];
}

export interface Edge {
    node: Node;
}

export interface Node {
    collections: Collections;
    tags: string[];
    variants: Variants;
    priceRangeV2: PriceRangeV22;
    compareAtPriceRange: CompareAtPriceRange2;
    title: string;
    description: string;
    descriptionHtml: string;
    seo: Seo;
    images: Images;
    featuredImage: FeaturedImage2;
    metafield?: Metafield;
    comparator?: Comparator;
}

export interface Collections {
    edges: Edge2[];
}

export interface Edge2 {
    node: Node2;
}

export interface Node2 {
    title: string;
    handle: string;
    products: Products2;
}

export interface Products2 {
    edges: Edge3[];
}

export interface Edge3 {
    node: Node3;
}

export interface Node3 {
    title: string;
    description: string;
    id: string;
    handle: string;
    options: Option[];
    featuredImage: FeaturedImage;
    priceRangeV2: PriceRangeV2;
    compareAtPriceRange: CompareAtPriceRange;
}

export interface Option {
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

export interface PriceRangeV2 {
    maxVariantPrice: MaxVariantPrice;
}

export interface MaxVariantPrice {
    amount: string;
}

export interface CompareAtPriceRange {
    maxVariantCompareAtPrice: MaxVariantCompareAtPrice;
}

export interface MaxVariantCompareAtPrice {
    amount: string;
}

export interface Variants {
    edges: Edge4[];
}

export interface Edge4 {
    node: Node4;
}

export interface Node4 {
    id: string;
    availableForSale: boolean;
    title: string;
    selectedOptions: SelectedOption[];
    price: string;
    compareAtPrice: string;
    image?: Image;
}

export interface SelectedOption {
    name: string;
    value: string;
}

export interface Image {
    altText: any;
    height: number;
    id: string;
    url: string;
    thumbnail: string;
    width: number;
}

export interface PriceRangeV22 {
    maxVariantPrice: MaxVariantPrice2;
    minVariantPrice: MinVariantPrice;
}

export interface MaxVariantPrice2 {
    amount: string;
}

export interface MinVariantPrice {
    amount: string;
}

export interface CompareAtPriceRange2 {
    maxVariantCompareAtPrice: MaxVariantCompareAtPrice2;
    minVariantCompareAtPrice: MinVariantCompareAtPrice;
}

export interface MaxVariantCompareAtPrice2 {
    amount: string;
}

export interface MinVariantCompareAtPrice {
    amount: string;
}

export interface Seo {
    description: any;
    title: any;
}

export interface Images {
    edges: Edge5[];
}

export interface Edge5 {
    node: Node5;
}

export interface Node5 {
    altText: string;
    id: string;
    url: string;
    thumbnail: string;
}

export interface FeaturedImage2 {
    id: string;
    altText: any;
    height: number;
    url: string;
    thumbnail: string;
    width: number;
}

export interface Metafield {
    references: References;
}

export interface References {
    edges: Edge6[];
}

export interface Edge6 {
    node: Node6;
}

export interface Node6 {
    id: string;
    fields: Field[];
    handle: string;
}

export interface Field {
    key: string;
    value: string;
}

export interface Comparator {
    reference: Reference;
}

export interface Reference {
    fields: Field2[];
}

export interface Field2 {
    key: string;
    value: string;
    reference: Reference2;
}

export interface Reference2 {
    alt: string;
    image: Image2;
}

export interface Image2 {
    url: string;
}

export interface Extensions {
    cost: Cost;
}

export interface Cost {
    requestedQueryCost: number;
    actualQueryCost: number;
    throttleStatus: ThrottleStatus;
}

export interface ThrottleStatus {
    maximumAvailable: number;
    currentlyAvailable: number;
    restoreRate: number;
}
