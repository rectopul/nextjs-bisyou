import { ApiErrorHandler } from "@/@types/ApiError";
import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function PUT(req: NextRequest) {
    const url = new URL(req.url);
    const id = String(url.searchParams.get("id"));
    const body = await req.json();

    const partner = await prisma.partners.findFirst({
        where: { id: +id },
    });

    if (!partner) {
        const error: ApiErrorHandler = {
            message: `Parceiro não existe`,
            name: "not found",
        };

        return NextResponse.json(error, { status: 401 });
    }

    const data: Prisma.PartnersUpdateInput = body;

    const updated = await prisma.partners.update({
        where: { id: +id },
        data,
    });

    return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = String(url.searchParams.get("id"));

    const partner = await prisma.partners.findFirst({
        where: { id: +id },
    });

    if (!partner) {
        const error: ApiErrorHandler = {
            message: `Parceiro não existe`,
            name: "not found",
        };

        return NextResponse.json(error, { status: 401 });
    }

    const deleted = await prisma.partners.delete({
        where: { id: +id },
    });

    return NextResponse.json(deleted);
}
