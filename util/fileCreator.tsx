import slugify from "slugify";
import sharp from "sharp";
import fs from "fs";
import CryptoJS from "crypto-js";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);
import path from "path";
import { createThumbnail } from "./generateThumbnail";
import { Sharp } from "@/@types/Sharp";

interface fileCreatorObject {
    name: string;
    slug: string;
    src: string;
    thumbnail?: Sharp.OutputInfo;
    metadata: {
        width: number;
        heigth: number;
    };
}

export async function fileCreator(file: File): Promise<fileCreatorObject> {
    try {
        const pathDir = path.join(process.cwd(), "public", "file");
        const hash = CryptoJS.SHA256(
            file.name + Date.now().toString()
        ).toString(CryptoJS.enc.Hex);

        const ext = path.extname(file.name || "");
        const newFilename = `${hash}${ext}`;
        const filePath = `${pathDir}/${newFilename}`;
        const anyFile = file as any;
        await pump(anyFile.stream(), fs.createWriteStream(filePath));

        const metadata = await sharp(filePath).metadata();
        const thumbnail = await createThumbnail(
            filePath,
            `${pathDir}/thumbnails/${newFilename}`
        );

        const image_slug = slugify(file.name, {
            lower: true,
            strict: true,
        });

        return {
            name: file.name,
            slug: image_slug,
            src: newFilename,
            thumbnail,
            metadata: {
                width: metadata.width as number,
                heigth: metadata.height as number,
            },
        };
    } catch (error) {
        throw error;
    }
}
