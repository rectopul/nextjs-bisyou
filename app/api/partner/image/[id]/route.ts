import { ApiErrorHandler } from "@/@types/ApiError";
import prisma from "@/lib/client";
import { fileCreator } from "@/util/fileCreator";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const formData = await req.formData();
    const file: any = formData.get("file");
    const { id } = params;

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
