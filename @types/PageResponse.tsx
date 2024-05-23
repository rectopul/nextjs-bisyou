export interface PageResponse {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    slug: string;
    category: number;
    status: string;
    excerpt: string;
    description: string;
    content: string;
    image: Image;
    CategoryPages: CategoryPage[];
}

export interface Image {
    id: number;
    createdAt: string;
    updatedAt: string;
    alt: string;
    src: string;
    width: number;
    heigth: number;
    page_id: number;
}

export interface CategoryPage {
    id: number;
    createdAt: string;
    updatedAt: string;
    category_id: number;
    pages_id: number;
    category: Category;
}

export interface Category {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    slug: string;
    description: string;
}
  
