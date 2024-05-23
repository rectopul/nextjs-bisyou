import { NextRequest } from "next/server";
import prisma from "@/lib/client";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import { fileCreator } from "@/util/fileCreator";

export const dynamic = "force-dynamic";

export async function PUT(
    req: NextRequest,
    { params }: { params: { page_id: string } }
) {
    const page_id = parseInt(params.page_id);

    const formData = await req.formData();
    const files: any = formData.getAll("file");

    try {
        const title = String(formData.get("title"));
        const category = parseInt(formData.get("category") as string);
        const excerpt = String(formData.get("excerpt"));
        const description = String(formData.get("description"));
        const content = String(formData.get("content"));
        const slug = slugify(title, { lower: true, strict: true });

        const hasPage = await prisma.pages.findFirst({
            where: { id: page_id },
        });

        if (!hasPage) {
            return Response.json(
                {
                    name: "not found",
                    message: "Page not found",
                },
                { status: 404 }
            );
        }

        const page = await prisma.pages.update({
            where: { id: page_id },
            data: {
                title,
                category,
                excerpt,
                description,
                content,
                slug,
            },
        });

        if (files) {
            const pathDir = path.join(process.cwd(), "public", "file");

            const hasImagePage = await prisma.imagePages.findFirst({
                where: { page_id: page.id },
            });

            if (hasImagePage) {
                if (fs.existsSync(`${pathDir}/${hasImagePage.src}`)) {
                    fs.unlinkSync(`${pathDir}/${hasImagePage.src}`);

                    const file = files[0];

                    const { metadata, slug, src } = await fileCreator(file);

                    await prisma.imagePages.update({
                        where: {
                            page_id,
                        },
                        data: {
                            alt: slug,
                            src,
                            heigth: metadata.heigth,
                            width: metadata.width,
                            page_id,
                        },
                    });

                    const newPage = await prisma.pages.findFirst({
                        where: { id: page_id },
                        include: { image: true },
                    });

                    return Response.json(newPage);
                } else {
                    const file = files[0];

                    const { metadata, slug, src } = await fileCreator(file);

                    const page_image = await prisma.imagePages.update({
                        where: {
                            page_id,
                        },
                        data: {
                            alt: slug,
                            src,
                            heigth: metadata.heigth,
                            width: metadata.width,
                            page_id,
                        },
                    });

                    const newPage = await prisma.pages.findFirst({
                        where: { id: page_id },
                        include: { image: true },
                    });

                    return Response.json(newPage);
                }
            }
        }

        return Response.json(page);
    } catch (error) {
        console.log(error);
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { page_id: string } }
) {
    const page_id = parseInt(params.page_id);

    try {
        const page = await prisma.pages.findFirst({ where: { id: page_id } });

        if (page) {
            const image = await prisma.imagePages.findFirst({
                where: { page_id },
            });

            if (image) {
                const pathDir = path.join(process.cwd(), "public", "file");

                if (fs.existsSync(`${pathDir}/${image.src}`)) {
                    fs.unlinkSync(`${pathDir}/${image.src}`);
                }

                await prisma.imagePages.delete({ where: { page_id } });
            }

            await prisma.pages.delete({ where: { id: page_id } });
            return Response.json({ message: "ok" });
        } else {
            return Response.json({ name: "error", message: "page not found" });
        }
    } catch (error) {
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
