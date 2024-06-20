import { PageResponse } from "@/@types/PageResponse";
import { CreatePagePayload } from "@/components/panel/pages/CreateForm";
import { CreateCategoryPayload } from "@/components/panel/pages/category/CreateForm";
import { Category } from "@prisma/client";

export class Pages {
    private url: string;

    constructor() {
        this.url = `${
            process.env.NEXT_PUBLIC_MODE === "dev"
                ? process.env.NEXT_PUBLIC_API_LOCAL_URL
                : process.env.NEXT_PUBLIC_API_BASE_URL
        }/api/pages`;
    }

    async store(data: CreatePagePayload, token: string) {
        try {
            if (!token) {
                throw new Error(`Token de acesso não encontrado`);
            }

            const formData = new FormData();

            formData.append("title", data.title);

            data.category && formData.append("category", String(data.category));

            formData.append("content", data.content);
            formData.append("description", data.description);
            formData.append("excerpt", data.excerpt);
            formData.append("file", data.file);

            const options: RequestInit = {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: formData,
            };
            const pages = await fetch(`${this.url}`, options);

            if (!pages.ok) {
                const resp = await pages.json();
                throw new Error(resp.message);
            }

            return await pages.json();
        } catch (error) {
            throw error;
        }
    }
    async storeCategory(
        data: CreateCategoryPayload,
        token: string
    ): Promise<Category> {
        try {
            if (!token) {
                throw new Error(`Token de acesso não encontrado`);
            }

            const options: RequestInit = {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            };
            const category = await fetch(`${this.url}/category`, options);

            if (!category.ok) {
                const resp = await category.json();
                throw new Error(resp.message);
            }

            return await category.json();
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const options: RequestInit = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const pages = await fetch(
                `${this.url}/update?page_id=${id}`,
                options
            );

            if (!pages.ok) {
                const resp = await pages.json();
                throw new Error(resp.message);
            }

            return await pages.json();
        } catch (error) {
            throw error;
        }
    }

    async categories(): Promise<Category[]> {
        try {
            const pages = await fetch(`${this.url}/category`);

            if (!pages.ok) {
                const resp = await pages.json();
                throw new Error(resp.message);
            }

            return await pages.json();
        } catch (error) {
            throw error;
        }
    }

    async deleteCategory(id: number): Promise<Category[]> {
        try {
            const options: RequestInit = {
                method: "DELETE",
            };

            const req = await fetch(`${this.url}/category/update?id=${id}`, options);

            if (!req.ok) {
                const resp = await req.json();
                throw new Error(resp.message);
            }

            return await req.json();
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<PageResponse[]> {
        try {
            const pages = await fetch(this.url);

            if (!pages.ok) {
                const resp = await pages.json();
                throw new Error(resp.message);
            }

            return await pages.json();
        } catch (error) {
            throw error;
        }
    }
}
