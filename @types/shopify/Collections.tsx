import { ProductOptions } from "../CollectionInProduct";
import { Shopify } from "../shopify";

export interface CollectionObject {
    data: {
        collections: {
            edges: CollectionObjectEdge[];
        };
    };
}

export interface CollectionObjectEdge {
    node: {
        title: string;
        handle: string;
        id: string;
        image: CollectionObjectImage | null;
    };
}

export interface CollectionObjectImage {
    altText: string;
    width: string;
    height: string;
    id: string;
    url: string;
    thumbnail: string;
}

export interface ProductImage {
    url: string;
    thumbnail: string;
    id: string;
    height: number;
    altText: string;
    width: number;
}

export interface ProductMedia {
    mediaContentType: string;
    url: string;
    thumbnail: string;
    id: string;
    height: string;
    alt: string;
    image: ProductImage;
    width: string;
}

export interface ProductVariant {
    availableForSale: boolean;
    compareAtPriceV2: {
        amount: string;
    };
    compareAtPrice: {
        amount: string;
    };
    price: {
        amount: string;
    };
    priceV2: {
        amount: string;
    };
    selectedOptions: {
        name: string;
        value: string;
    }[];
    sku: string;
    id: string;
    title: string;
}

export interface CollectionProduct {
    node: Shopify.Products;
}

export interface CollectionSingleObject {
    data: {
        collection: {
            title: string;
            id: string;
            handle: string;
            products: {
                edges: CollectionProduct[];
            };
        };
    };
}
