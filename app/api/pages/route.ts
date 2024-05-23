import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import slugify from "slugify";
import { fileCreator } from "@/util/fileCreator";

/**
 *
 * @param request
 * @returns
 *
 */

export async function POST(req: NextRequest) {
    //const form = new formidable.IncomingForm();
    // form.parse(req, async (err, fields, files) => {
    //     if (err) {
    //         console.error("Error parsing form:", err);
    //         return res.status(500).json({ error: "Error parsing form" });
    //     }

    //     let file = files.file as
    //         | formidable.File
    //         | formidable.File[]
    //         | undefined;

    //     // Verificar se é um array de arquivos
    //     if (Array.isArray(file)) {
    //         file = file[0]; // Usar o primeiro arquivo
    //     }

    //     if (!file || file.size === 0) {
    //         return res.status(400).json({ error: "Arquivo não enviado" });
    //     }

    //     try {
    //         const metadata = await sharp(
    //             file.originalFilename || ""
    //         ).metadata();
    //         const dimensions = {
    //             width: metadata.width,
    //             height: metadata.height,
    //         };
    //         const slug = slugify(file.originalFilename || "", {
    //             lower: true,
    //             strict: true,
    //         });

    //         console.log({ dimensions, slug });

    //         return res.status(200).json({ dimensions, slug });
    //     } catch (error) {
    //         console.error("Error processing image:", error);
    //         return res
    //             .status(500)
    //             .json({ error: "Could not process the image" });
    //     }
    // });
    const formData = await req.formData();
    const files: any = formData.getAll("file");

    try {
        if (files) {
            const file = files[0];

            //Criação da página
            const title = String(formData.get("title"));
            const category = parseInt(formData.get("category") as string);
            const excerpt = String(formData.get("excerpt"));
            const description = String(formData.get("description"));
            const content = String(formData.get("content"));
            const slug = slugify(title, { lower: true, strict: true });

            let page = null;

            if (category) {
                const hasCaregory = await prisma.category.findFirst({
                    where: { id: category },
                });

                if (!hasCaregory) {
                    return Response.json(
                        { name: "not found", message: "category not found " },
                        { status: 400 }
                    );
                }

                page = await prisma.pages.create({
                    data: {
                        title,
                        category,
                        excerpt,
                        description,
                        content,
                        slug,
                        status: `active`,
                    },
                });

                await prisma.categoryPages.create({
                    data: { category_id: category, pages_id: page.id },
                });
            } else {
                page = await prisma.pages.create({
                    data: {
                        title,
                        category,
                        excerpt,
                        description,
                        content,
                        slug,
                        status: `active`,
                    },
                });
            }

            const { metadata, slug: image_slug, src } = await fileCreator(file);

            const dimensions = {
                width: metadata.width as number,
                height: metadata.heigth as number,
            };

            if (page) {
                await prisma.imagePages.create({
                    data: {
                        alt: image_slug,
                        src: src,
                        heigth: dimensions.height,
                        width: dimensions.width,
                        page_id: page.id,
                    },
                });

                const resp = await prisma.pages.findFirst({
                    where: { id: page.id },
                    include: {
                        image: true,
                        CategoryPages: { include: { category: true } },
                    },
                });

                return Response.json(resp);
            }
        }
    } catch (error) {
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    try {
        const pages = await prisma.pages.findMany({
            include: {
                image: true,
                CategoryPages: { include: { category: true } },
            },
        });
        return NextResponse.json(pages, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error, { status: 400 });
    }
}
