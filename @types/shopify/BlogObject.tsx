export interface BlogObject {
    data: Data;
}

export interface Data {
    blog: Blog;
}

export interface Blog {
    id: string;
    handle: string;
    title: string;
    articles: Articles;
}

export interface Articles {
    edges: Edge[];
}

export interface Edge {
    node: Node;
}

export interface Node {
    authorV2: AuthorV2;
    contentHtml: string;
    excerptHtml: string;
    handle: string;
    id: string;
    image: Image;
    title: string;
    tags: string[];
    publishedAt: string;
}

export interface AuthorV2 {
    name: string;
    lastName: string;
    firstName: string;
    bio: any;
}

export interface Image {
    altText: any;
    height: number;
    id: string;
    width: number;
    url: string;
    thumbnail: string;
}
