//{ params }: { params: { page_id: string } }

import { PrismaErrorHandler } from "@/@types/PrismaErrorHandler";
import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    res: NextResponse,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const hasShop = await prisma.shopLocations.findFirst({
            where: { id: parseInt(id) },
        });

        if (!hasShop) {
            return NextResponse.json(
                {
                    name: "not exists",
                    message: "Shop not exists",
                },
                { status: 401 }
            );
        }

        const delShop = await prisma.shopLocations.delete({
            where: { id: hasShop.id },
        });

        return NextResponse.json(delShop);
    } catch (error: any) {
        console.log(error);
        if (error.name === "PrismaClientKnownRequestError") {
            const hasError = error as PrismaErrorHandler;

            if (hasError.code === "P2002") {
                return NextResponse.json(
                    {
                        name: "duplicidade",
                        message: `Os campos ${hasError.meta.target.join(
                            " "
                        )} já existem`,
                    },
                    { status: 409 }
                );
            }
        }
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
