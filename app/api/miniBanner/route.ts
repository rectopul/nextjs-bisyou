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
            const name = String(formData.get("name"));
            const url = String(formData.get("url"));
            const type = String(formData.get("type"));

            if (type !== "desktop" && type !== "mobile") {
                return NextResponse.json(
                    {
                        name: "not found",
                        message: "type value is desktop or mobile",
                    },
                    { status: 400 }
                );
            }

            const slug = slugify(name, { strict: true, lower: true });

            const miniBanner = await prisma.miniBanners.create({
                data: {
                    slug,
                    name,
                    url,
                    type,
                },
            });

            if (miniBanner) {
                const {
                    metadata,
                    slug: image_slug,
                    src,
                    name: imageName,
                } = await fileCreator(file);

                const dimensions = {
                    width: metadata.width as number,
                    height: metadata.heigth as number,
                };

                await prisma.miniBannersImages.create({
                    data: {
                        alt: image_slug,
                        src: src,
                        heigth: dimensions.height,
                        width: dimensions.width,
                        name: imageName,
                        miniBanners_id: miniBanner.id,
                    },
                });

                const resp = await prisma.miniBanners.findFirst({
                    where: { id: miniBanner.id },
                    include: { image: true },
                });

                return Response.json(resp);
            }
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
        const miniBanner = await prisma.miniBanners.findMany({
            include: { image: true },
        });
        return NextResponse.json(miniBanner, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error, { status: 400 });
    }
}
