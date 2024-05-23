import prisma from "@/lib/client";
import { Settings } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const data = (await req.json()) as Settings;
    const { id } = params;

    try {
        if (data) {
            //Criação da página
            const hasSettings = await prisma.settings.findFirst({
                where: { id: +id },
            });

            if (!hasSettings) {
                return NextResponse.json(
                    {
                        name: "not found",
                        message: "This settings not exists",
                    },
                    { status: 400 }
                );
            }

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

            const response = await prisma.settings.update({
                where: { id: +id },
                data: { ...data, storeSlug },
            });

            return Response.json(response);
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

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;

        const setting = await prisma.settings.findFirst({
            where: { storeSlug: slug },
        });

        if (!setting) {
            return NextResponse.json(
                { name: "not found", message: "the page not found " },
                { status: 400 }
            );
        }

        return NextResponse.json(setting, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error, { status: 400 });
    }
}
