export interface MetaObjectFetch {
    data: Data;
}

export interface Data {
    metaobjects: Metaobjects;
}

export interface Metaobjects {
    edges: MetaobjectsEdges[];
}

export interface MetaobjectsEdges {
    node: MetaobjectNode;
}

export interface MetaobjectNode {
    id: string;
    handle: string;
    type: string;
    fields: MetaobjectField[];
}

export interface MetaobjectField {
    key: string;
    type: string;
    value: string;
}
