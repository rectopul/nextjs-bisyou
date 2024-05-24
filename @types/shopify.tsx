import { Product } from "./ProductObject";
import { BlogObject } from "./shopify/BlogObject";

export namespace Shopify {
    export interface Articles extends BlogObject {}

    export interface Products extends Product {}
}
