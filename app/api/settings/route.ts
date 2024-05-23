import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import slugify from "slugify";
import { Settings } from "@prisma/client";

/**
 *
 * @param request
 * @returns
 *
 */

export async function POST(req: NextRequest) {
    const data = (await req.json()) as Settings;

    try {
        if (data) {
            //Criação da página
            const { storename } = data;

            if (!storename) {
                return NextResponse.json(
                    {
                        name: "failed field",
                        message: "Please send a field storename",
                    },
                    { status: 400 }
                );
            }

            const storeSlug = slugify(storename, { strict: true, lower: true });

            const settings = await prisma.settings.create({
                data: { ...data, storeSlug },
            });

            return Response.json(settings);
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
