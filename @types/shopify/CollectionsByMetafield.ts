import { Shopify } from "../shopify";

export interface CollectionsByMetafieldsObject {
    data: Data;
}

export interface Data {
    collections: Collections;
}

export interface Collections {
    edges: Edge[];
}

export interface Edge {
    node: Node;
}

export interface Node {
    products: Products;
}

export interface Products {
    edges: Edge2[];
}

export interface Edge2 {
    node: ProductNode;
}

interface FieldCompare {
    reference: {
        field: {
            value: string;
        } | null;
    };
    value: string;
}

interface ProductNode extends Shopify.Products {
    field_tipo_de_pele?: FieldCompare | null;
    field_nescessidades_do_produto?: FieldCompare | null;
    field_tipo_de_produto?: FieldCompare | null;
}
