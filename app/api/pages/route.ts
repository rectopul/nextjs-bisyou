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
