import prisma from "@/lib/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = String(url.searchParams.get("id"));
        const category = await prisma.category.findFirst({
            where: { id: +id },
        });

        if (!category) {
            return Response.json(
                { name: "not found", message: "Categoria não existe" },
                { status: 401 }
            );
        }

        return Response.json(category, { status: 200 });
    } catch (error) {
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = String(url.searchParams.get("id"));
        const category = await prisma.category.findFirst({
            where: { id: +id },
        });

        if (!category) {
            return Response.json(
                { name: "not found", message: "Categoria não existe" },
                { status: 401 }
            );
        }

        await prisma.category.delete({ where: { id: +id } });

        return Response.json(
            { name: "success", message: "excluido com sucesso!" },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
