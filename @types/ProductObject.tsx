import { CollectionInProduct } from "./CollectionInProduct";

export interface ProductObject {
    data: Data;
    errors: Error[];
}

export interface Data {
    product: Product | null;
}

export interface Product {
    id: string;
    availableForSale: boolean;
    tags: string[];
    variants: Variants;
    priceRange: PriceRange;
    compareAtPriceRange: PriceRange;
    title: string;
    handle: string;
    description: string;
    descriptionHtml: string;
    seo: Seo;
    images: Images;
    featuredImage: FeaturedImage;
    metafield: MetaFieldObject | null;
    collections: CollectionInProduct;
    comparator: ComparatorObject | null;
}

export interface ComparatorObject {
    reference: {
        fields: ComparatorField[];
    };
}

export interface ComparatorField {
    value: string;
    key: string;
    reference: {
        alt: string;
        image: {
            url: string;
        };
    };
}

export interface MetaFieldObject {
    references: {
        edges: MetaFieldEdges[];
    };
}

export interface MetaFieldEdges {
    node: {
        id: string;
        fields: MetaFieldEdgesFields[];
        handle: string;
    };
}

export interface MetaFieldEdgesFields {
    key: string;
    value: string;
}

export interface Variants {
    edges: Edge[];
}

export interface Edge {
    node: Node;
}

export interface Node {
    id: string;
    availableForSale: boolean;
    title: string;
    quantityAvailable: any;
    selectedOptions: SelectedOption[];
    compareAtPrice: CompareAtPrice;
    price: Price;
    image: Image;
}

export interface SelectedOption {
    name: string;
    value: string;
}

export interface CompareAtPrice {
    amount: string;
}

export interface Price {
    amount: string;
}

export interface Image {
    altText: any;
    height: number;
    id: string;
    url: string;
    thumbnail: string;
    width: number;
}

export interface PriceRange {
    maxVariantPrice: MaxVariantPrice;
    minVariantPrice: MaxVariantPrice;
}

export interface MaxVariantPrice {
    amount: string;
}

export interface MaxVariantPrice2 {
    amount: string;
}

export interface MinVariantPrice2 {
    amount: string;
}

export interface Seo {
    description: any;
    title: any;
}

export interface Images {
    edges: Edge2[];
}

export interface Edge2 {
    node: Node2;
}

export interface Node2 {
    altText: any;
    id: string;
    url: string;
    thumbnail: string;
}

export interface FeaturedImage {
    id: string;
    altText: any;
    height: number;
    url: string;
    thumbnail: string;
    width: number;
}

export interface Error {
    message: string;
    locations: Location[];
    path: [string, string, string, number, string, string];
    extensions: Extensions;
}

export interface Location {
    line: number;
    column: number;
}

export interface Extensions {
    code: string;
    documentation: string;
    requiredAccess: string;
}
