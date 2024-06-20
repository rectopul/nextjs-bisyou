import { ApiErrorHandler } from "@/@types/ApiError";
import prisma from "@/lib/client";
import { fileCreator } from "@/util/fileCreator";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function PUT(req: NextRequest) {
    const formData = await req.formData();
    const file: any = formData.get("file");
    const url = new URL(req.url);
    const id = String(url.searchParams.get("id"));

    const partner = await prisma.partners.findFirst({
        where: { id: +id },
    });

    if (!file) {
        const error: ApiErrorHandler = {
            message: `Por favor envie a imagem`,
            name: "file not found",
        };

        return NextResponse.json(error, { status: 401 });
    }

    if (!partner) {
        const error: ApiErrorHandler = {
            message: `Parceiro não existe`,
            name: "not found",
        };

        return NextResponse.json(error, { status: 401 });
    }

    const { metadata, src } = await fileCreator(file);

    const { heigth, width } = metadata;

    const updated = await prisma.partners.update({
        where: { id: +id },
        data: { image: src, width, height: heigth },
    });

    return NextResponse.json(updated);
}
