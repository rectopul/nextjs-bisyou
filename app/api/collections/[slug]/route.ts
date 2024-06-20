import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";

export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;
    const data = (await request.json()) as Prisma.ColletionsCreateInput;

    try {
        const collection = await prisma.colletions.findFirst({
            where: { slug },
        });

        if (collection) {
            const updated = await prisma.colletions.update({
                where: { slug },
                data,
            });

            return Response.json(updated);
        }

        const response = await prisma.colletions.create({ data });

        return Response.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    } finally {
        prisma.$disconnect();
    }
}
