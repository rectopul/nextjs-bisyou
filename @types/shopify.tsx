import { Product } from "./ProductObject";
import { BlogObject } from "./shopify/BlogObject";
import { CollectionSingleObject } from "./shopify/Collections";

export namespace Shopify {
    export interface Articles extends BlogObject {}

    export interface Products extends Product {}

    export interface Search {
        data: {
            products: {
                edges: {
                    node: Product;
                }[];
            };
            pages: {
                edges: {
                    node: {
                        id: string;
                        title: string;
                        handle: string;
                        bodySummary: string;
                        body: string;
                    }[];
                };
            };
        };
    }

    export interface CollectionSinge extends CollectionSingleObject {}
}
