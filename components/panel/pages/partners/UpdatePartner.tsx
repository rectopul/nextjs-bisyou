import { ApiErrorHandler } from "@/@types/ApiError";
import { Partners } from "@prisma/client";
import { toast } from "sonner";

export async function UpdatePartner(
    text: string,
    id: number
): Promise<Partners> {
    try {
        const options: RequestInit = {
            method: "PUT",
            body: JSON.stringify({ text }),
        };

        const req = await fetch(`/api/partner/${id}`, options);

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
