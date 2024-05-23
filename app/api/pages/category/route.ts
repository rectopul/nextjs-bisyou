import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import slugify from "slugify";
import { PrismaErrorHandler } from "@/@types/PrismaErrorHandler";

/**
 *
 * @param request
 * @returns
 *
 */

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        if (!data) {
            return NextResponse.json(
                {
                    name: "field error",
                    message: "Por favor envie todos os fields",
                },
                { status: 400 }
            );
        }

        const { title, description } = data;

        if (!title || !description) {
            return NextResponse.json(
                {
                    name: "field error",
                    message: "Por favor envie todos os fields",
                },
                { status: 400 }
            );
        }

        const slug = slugify(title, { lower: true, strict: true });

        const category = await prisma.category.create({
            data: { title, slug, description },
        });

        return Response.json(category);
    } catch (error: any) {
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

export async function GET() {
    try {
        const categories = await prisma.category.findMany();

        return Response.json(categories, { status: 200 });
    } catch (error) {
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
