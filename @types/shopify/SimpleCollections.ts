export interface CollectionData {
    data: Data;
}

export interface Data {
    collections: Collections;
}

export interface Collections {
    edges: CollectionEdge[];
}

export interface CollectionEdge {
    node: CollectionNode;
}

export interface CollectionNode {
    title: string;
    description: string;
    handle: string;
    id: string;
    image: ImageNode | null;
}

export interface ImageNode {
    thumbnail: string;
    altText: string;
    url: string;
}
