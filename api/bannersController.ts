import { Banners, Category } from "@prisma/client";

interface BannersPayload {
    title?: string;
    status?: string;
    url: string;
    file: File;
}

export class BannersController {
    private url: string;

    constructor() {
        this.url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/banners`;
    }

    async store(data: BannersPayload, token: string): Promise<Banners> {
        try {
            if (!token) {
                throw new Error(`Token de acesso não encontrado`);
            }

            const formData = new FormData();

            data.title && formData.append("title", data.title);

            data.status && formData.append("status", data.status);
            formData.append("file", data.url);
            formData.append("file", data.file);

            const options: RequestInit = {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: formData,
            };
            const banners = await fetch(`${this.url}`, options);

            if (!banners.ok) {
                const resp = await banners.json();
                throw new Error(resp.message);
            }

            return await banners.json();
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
            const pages = await fetch(`${this.url}/${id}`, options);

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

            const req = await fetch(`${this.url}/category/${id}`, options);

            if (!req.ok) {
                const resp = await req.json();
                throw new Error(resp.message);
            }

            return await req.json();
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<Banners[]> {
        try {
            const banners = await fetch(this.url);

            if (!banners.ok) {
                const resp = await banners.json();
                throw new Error(resp.message);
            }

            return await banners.json();
        } catch (error) {
            throw error;
        }
    }
}
