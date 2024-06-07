import { SimpleNode } from "./CollectionInProduct";
import { Product } from "./ProductObject";
import { BlogObject } from "./shopify/BlogObject";
import { CartData, CartItem } from "./shopify/CartObject";
import { CheckoutData } from "./shopify/Checkout";
import { CollectionSingleObject } from "./shopify/Collections";
import { Errors } from "./shopify/Erros";
import { MetaObjectFetch, MetaobjectsEdges } from "./shopify/MetaObjects";
import {
    AllProductCategory,
    ProductCategoryEdge,
} from "./shopify/ProductCategory";

export namespace Shopify {
    export namespace MetaObjects {
        export interface MetaObjectData extends MetaObjectFetch {}
        export interface MetaObjectEdge extends MetaobjectsEdges {}
    }

    export interface Articles extends BlogObject {}

    export interface Products extends Product {}
    export interface SimpleProduct extends SimpleNode {}

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

    export namespace Cart {
        export interface Data extends CartData {}
        export interface Item extends CartItem {}
        export interface Checkout extends CheckoutData {}
    }

    export interface Error extends Errors {}

    export interface CollectionSinge extends CollectionSingleObject {}

    export interface ProductCategoryData extends ProductCategoryEdge {}
    export interface ProductCategory extends AllProductCategory {}

    export interface QueryProducts {}
}
