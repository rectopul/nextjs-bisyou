import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import path from "path";
import { Sharp } from "@/@types/Sharp";

// Função para gerar a thumbnail
const createThumbnail = async (
    fileBuffer: Buffer,
    filename: string,
    s3Client: S3Client,
    bucket: string
): Promise<{ name: string; src: { md: string; sm: string; lg: string } }> => {
    try {
        const { name } = path.parse(filename);

        const smBuffer = await sharp(fileBuffer)
            .resize({ width: 600 })
            .webp({ quality: 90 })
            .toBuffer();

        const smKey = `thumbnails/sm/${name}.webp`;

        const sm = await new Upload({
            client: s3Client,
            params: {
                Bucket: bucket,
                Key: smKey,
                Body: smBuffer,
                ContentType: "image/webp",
                ACL: "public-read",
            },
        }).done();

        // Create and upload the medium thumbnail
        const mdBuffer = await sharp(fileBuffer)
            .resize({ width: 800 })
            .webp({ quality: 90 })
            .toBuffer();

        const mdKey = `thumbnails/md/${name}.webp`;
        const md = await new Upload({
            client: s3Client,
            params: {
                Bucket: bucket,
                Key: mdKey,
                Body: mdBuffer,
                ContentType: "image/webp",
                ACL: "public-read",
            },
        }).done();

        // Create and upload the large thumbnail
        const lgBuffer = await sharp(fileBuffer)
            .resize({ width: 1024 })
            .webp({ quality: 90 })
            .toBuffer();

        const lgKey = `thumbnails/lg/${name}.webp`;
        const lg = await new Upload({
            client: s3Client,
            params: {
                Bucket: bucket,
                Key: lgKey,
                Body: lgBuffer,
                ContentType: "image/webp",
                ACL: "public-read",
            },
        }).done();

        const src = {
            md: md.Location || "",
            sm: sm.Location || "",
            lg: lg.Location || "",
        };

        return { name, src };
    } catch (error) {
        console.error("Erro ao criar a thumbnail:", error);
        throw error;
    }
};

export { createThumbnail };
