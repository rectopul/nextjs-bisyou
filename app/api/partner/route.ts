import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import { fileCreator } from "@/util/fileCreator";
import slugify from "slugify";

/**
 *
 * @param request
 * @returns
 *
 */

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file: any = formData.get("file");

    try {
        if (file) {
            //Criação da página
            const title = String(formData.get("title"));
            const url = String(formData.get("url"));

            const slug = slugify(title, { strict: true, lower: true });

            const { metadata, src } = await fileCreator(file);

            const dimensions = {
                width: metadata.width as number,
                height: metadata.heigth as number,
            };

            const partner = await prisma.partners.create({
                data: {
                    slug,
                    title,
                    url,
                    image: src,
                    alt: slug,
                    height: dimensions.height,
                    width: dimensions.height,
                },
            });

            return Response.json(partner);
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
        const partners = await prisma.partners.findMany();
        return NextResponse.json(partners, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error, { status: 400 });
    }
}
