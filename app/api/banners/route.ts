import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import { fileCreator } from "@/util/fileCreator";

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
            const status = String(formData.get("status")) || "active";

            const banner = await prisma.banners.create({
                data: {
                    title,
                    url,
                    status,
                },
            });

            const {
                metadata,
                slug: image_slug,
                thumbnail,
                src,
                name,
            } = await fileCreator(file);

            const dimensions = {
                width: metadata.width as number,
                height: metadata.heigth as number,
            };

            if (banner) {
                const banner_image = await prisma.bannersImage.create({
                    data: {
                        alt: image_slug,
                        src: src,
                        heigth: dimensions.height,
                        width: dimensions.width,
                        name,
                        banners_id: banner.id,
                    },
                });

                if (banner_image && thumbnail) {
                    await prisma.bannersThumbnail.create({
                        data: {
                            heigth: thumbnail.height,
                            width: thumbnail.width,
                            banners_id: banner_image.id,
                            name,
                            alt: image_slug,
                            src: thumbnail.src.md,
                            ...thumbnail.src,
                        },
                    });
                }

                const resp = await prisma.banners.findFirst({
                    where: { id: banner.id },
                    include: {
                        image: { include: { thumbnail: true } },
                    },
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
        const pages = await prisma.banners.findMany({
            include: {
                image: true,
            },
        });
        return NextResponse.json(pages, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error, { status: 400 });
    }
}
