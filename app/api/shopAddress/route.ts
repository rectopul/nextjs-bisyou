import { PrismaErrorHandler } from "@/@types/PrismaErrorHandler";
import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = (await req.json()) as Prisma.ShopLocationsCreateInput;

        if (!data) {
            return NextResponse.json(
                {
                    name: "field error",
                    message: "Por favor envie todos os fields",
                },
                { status: 400 }
            );
        }

        const category = await prisma.shopLocations.create({
            data: { ...data, country: "BR" },
        });

        return Response.json(category);
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
