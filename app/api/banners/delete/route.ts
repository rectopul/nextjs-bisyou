import { NextRequest } from "next/server";
import prisma from "@/lib/client";
import fs from "fs";
import path from "path";
import { fileCreator } from "@/util/fileCreator";
import { validImageMimeTypes } from "@/util/imageMimeTypes";

export const dynamic = "force-dynamic";
export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const value = String(url.searchParams.get("id"));
    const id = +value;

    try {
        const banner = await prisma.banners.findFirst({
            where: { id },
            include: { image: { include: { thumbnail: true } } },
        });

        if (!banner) {
            return Response.json(
                { name: "not fount", message: "banner not found" },
                { status: 401 }
            );
        }

        if (banner.image) {
            const pathDir = path.join(process.cwd(), "public", "file");

            if (fs.existsSync(`${pathDir}/${banner.image.src}`)) {
                console.log(`has file`);
                fs.unlinkSync(`${pathDir}/${banner.image.src}`);
            }

            if (banner.image.thumbnail) {
                if (fs.existsSync(`${pathDir}/${banner.image.thumbnail.sm}`)) {
                    console.log(`has file`);
                    fs.unlinkSync(`${pathDir}/${banner.image.thumbnail.sm}`);
                }

                if (fs.existsSync(`${pathDir}/${banner.image.thumbnail.md}`)) {
                    console.log(`has file`);
                    fs.unlinkSync(`${pathDir}/${banner.image.thumbnail.md}`);
                }

                if (fs.existsSync(`${pathDir}/${banner.image.thumbnail.lg}`)) {
                    console.log(`has file`);
                    fs.unlinkSync(`${pathDir}/${banner.image.thumbnail.lg}`);
                }
            }
        }

        const deleted = await prisma.banners.delete({ where: { id } });

        return Response.json(deleted);
    } catch (error) {
        console.log(error);
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
