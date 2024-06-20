import { ApiErrorHandler } from "@/@types/ApiError";
import { Partners } from "@prisma/client";
import { toast } from "sonner";

export async function UpdateImagePartner(
    file: File,
    id: number
): Promise<Partners> {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const options: RequestInit = {
            method: "PUT",
            body: formData,
        };

        const req = await fetch(`/api/partner/update?id=${id}`, options);

        if (!req.ok) {
            const error: ApiErrorHandler = await req.json();

            throw new Error(error.message);
        }

        return await req.json();
    } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.message);
    }
}
