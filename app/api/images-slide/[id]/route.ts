import { NextRequest } from "next/server";
import prisma from "@/lib/client";
import fs from "fs";
import path from "path";
import { fileCreator } from "@/util/fileCreator";
import { validImageMimeTypes } from "@/util/imageMimeTypes";

export const dynamic = "force-dynamic";
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const formData = await req.formData();
    const files: any = formData.getAll("file");
    const id = params.id;

    try {
        if (!validImageMimeTypes.includes(files[0].type)) {
            return Response.json({
                name: "file type",
                message: "Invalid image type.",
            });
        }
        if (files) {
            const pathDir = path.join(process.cwd(), "public", "file");

            const hasImage = await prisma.imagesSlideDefault.findFirst({
                where: { id },
            });

            if (hasImage) {
                if (fs.existsSync(`${pathDir}/${hasImage.src}`)) {
                    console.log(`has file`);
                    fs.unlinkSync(`${pathDir}/${hasImage.src}`);
                    const file = files[0];

                    const { src, slug, metadata } = await fileCreator(file);

                    const updated = await prisma.imagesSlideDefault.update({
                        where: { id },
                        data: {
                            alt: slug,
                            heigth: metadata.heigth,
                            width: metadata.width,
                            src: src,
                        },
                    });

                    return Response.json(updated);
                } else {
                    const file = files[0];

                    const { src, slug, metadata } = await fileCreator(file);

                    const updated = await prisma.imagesSlideDefault.update({
                        where: { id },
                        data: {
                            alt: slug,
                            heigth: metadata.heigth,
                            width: metadata.width,
                            src: src,
                        },
                    });
                    return Response.json(updated);
                }
            } else {
                return Response.json(
                    { name: "not fount", message: "image not found" },
                    { status: 401 }
                );
            }
        } else {
            return Response.json({
                name: "error input request",
                message: "Por favor envie um arquivo de imagem",
            });
        }
    } catch (error) {
        console.log(error);
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
