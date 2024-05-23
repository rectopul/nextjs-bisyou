import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import slugify from "slugify";

/**
 *
 * @param request
 * @returns
 *
 */

export async function POST(req: NextRequest) {
    const data = await req.json();

    try {
        if (data) {
            //Criação da página
            const { title } = data;

            const slug = slugify(title, { strict: true, lower: true });

            const rullerOption = await prisma.rullerOptions.create({
                data: {
                    title,
                    slug,
                },
            });

            return Response.json(rullerOption);
        }

        return Response.json(
            { name: "image not found", message: "por favor envie a imagem" },
            { status: 400 }
        );
    } catch (error) {
        console.log(`erro no banner`, error);
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    try {
        const rullerOptions = await prisma.rullerOptions.findMany();
        return NextResponse.json(rullerOptions, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error, { status: 400 });
    }
}
