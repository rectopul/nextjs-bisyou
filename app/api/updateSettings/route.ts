import prisma from "@/lib/client";
import { Settings } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const dynamic = "force-dynamic";
export async function PUT(req: NextRequest) {
    const data = (await req.json()) as Settings;

    try {
        if (data) {
            //Criação da página
            const hasSettings = await prisma.settings.findFirst({
                where: { id: data.id },
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
                where: { id: data.id },
                data: { ...data, storeSlug },
            });

            return NextResponse.json(response);
        }

        return NextResponse.json(
            { name: "image not found", message: "por favor envie a imagem" },
            { status: 400 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
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
