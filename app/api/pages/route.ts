import { NextRequest } from "next/server";
import prisma from "@/lib/client";
import slugify from "slugify";
import sharp from "sharp";
import fs from "fs";
import formidable, { File } from "formidable";
import crypto from "crypto";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);
import path from "path";
import { pages } from "next/dist/build/templates/app-page";
import { NextApiResponse } from "next";

const form = formidable({ multiples: true });
const isFile = (file: File | File[]): file is File =>
    !Array.isArray(file) && file.filepath !== undefined;

/**
 *
 * @param request
 * @returns
 *
 */

interface FileNext {
    size: number;
    type: string;
    name: string;
    lastModified: number;
}

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
            const pathDir = path.join(process.cwd(), "public", "file");
            const file = files[0];

            const hash = crypto
                .createHash("md5")
                .update(file.name + Date.now().toString())
                .digest("hex");

            const ext = path.extname(file.name || "");
            const newFilename = `${hash}${ext}`;
            const filePath = `${pathDir}/${newFilename}`;
            await pump(file.stream(), fs.createWriteStream(filePath));

            const metadata = await sharp(filePath).metadata();
            const image_slug = slugify(file.name, {
                lower: true,
                strict: true,
            });

            const dimensions = {
                width: metadata.width as number,
                height: metadata.height as number,
            };

            //Criação da página
            const title = String(formData.get("title"));
            const category = parseInt(formData.get("category") as string);
            const excerpt = String(formData.get("excerpt"));
            const description = String(formData.get("description"));
            const content = String(formData.get("content"));
            const slug = slugify(title, { lower: true, strict: true });

            const page = await prisma.pages.create({
                data: {
                    title,
                    category,
                    excerpt,
                    description,
                    content,
                    slug,
                },
            });

            const page_image = await prisma.imagePages.create({
                data: {
                    alt: image_slug,
                    src: newFilename,
                    heigth: dimensions.height,
                    width: dimensions.width,
                    page_id: page.id,
                },
            });

            return Response.json({ image: page_image, ...page });
        }
    } catch (error) {
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: NextRequest, res: NextApiResponse) {
    const formData = await req.formData();
    const page_id = await req.formData();
    const files: any = formData.getAll("file");

    try {
        const title = String(formData.get("title"));
        const category = parseInt(formData.get("category") as string);
        const excerpt = String(formData.get("excerpt"));
        const description = String(formData.get("description"));
        const content = String(formData.get("content"));
        const slug = slugify(title, { lower: true, strict: true });

        const page = await prisma.pages.create({
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
            const file = files[0];

            const hash = crypto
                .createHash("md5")
                .update(file.name + Date.now().toString())
                .digest("hex");

            const ext = path.extname(file.name || "");
            const newFilename = `${hash}${ext}`;
            const filePath = `${pathDir}/${newFilename}`;
            await pump(file.stream(), fs.createWriteStream(filePath));

            const metadata = await sharp(filePath).metadata();
            const image_slug = slugify(file.name, {
                lower: true,
                strict: true,
            });

            const dimensions = {
                width: metadata.width as number,
                height: metadata.height as number,
            };

            const hasPage = await prisma.imagePages.findFirst({
                where: { page_id: page.id },
            });

            if (hasPage) {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                } else {
                    return Response.json({
                        name: "file error",
                        message: "error on deletting current image",
                    });
                }
            }

            //Criação da página
            const page_image = await prisma.imagePages.create({
                data: {
                    alt: image_slug,
                    src: newFilename,
                    heigth: dimensions.height,
                    width: dimensions.width,
                    page_id: page.id,
                },
            });

            return Response.json({ image: page_image, ...page });
        }

        return Response.json(page);
    } catch (error) {
        console.log(error);
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
