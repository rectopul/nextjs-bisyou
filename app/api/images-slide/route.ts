import { NextRequest } from "next/server";
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
    const files: any = formData.getAll("file");

    try {
        if (files) {
            const file = files[0];

            const { slug, metadata, src } = await fileCreator(file);

            const page_image = await prisma.imagesSlideDefault.create({
                data: {
                    alt: slug,
                    heigth: metadata.heigth,
                    width: metadata.width,
                    src,
                },
            });

            return Response.json(page_image);
        }
    } catch (error) {
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
