import sharp from "sharp";
import fs from "fs";
import path from "path";
import { Sharp } from "@/@types/Sharp";

// Função para gerar a thumbnail
const createThumbnail = async (
    inputPath: string,
    outputPath: string
): Promise<Sharp.OutputInfo> => {
    try {
        const metaData = await sharp(inputPath)
            .resize({ width: 400 }) // Define a largura da thumbnail, mantém a proporção
            .toFile(outputPath);

        const basePath = path.join(
            process.cwd(),
            "public",
            "file",
            "thumbnails"
        );

        const fileNameWithExt = path.basename(inputPath);

        // Usar path.parse para dividir o caminho
        const { name } = path.parse(inputPath);

        const sm = await sharp(inputPath)
            .resize({ width: 600 })
            .webp({ quality: 90 }) // Define a largura da thumbnail, mantém a proporção
            .toFile(`${basePath}/sm/${name}.webp`);

        const md = await sharp(inputPath)
            .resize({ width: 800 }) // Define a largura da thumbnail, mantém a proporção
            .webp({ quality: 90 })
            .toFile(`${basePath}/md/${name}.webp`);

        const lg = await sharp(inputPath)
            .resize({ width: 1024 }) // Define a largura da thumbnail, mantém a proporção
            .webp({ quality: 90 })
            .toFile(`${basePath}/lg/${name}.webp`);

        const src = {
            md: `thumbnails/md/${name}.webp`,
            sm: `thumbnails/sm/${name}.webp`,
            lg: `thumbnails/lg/${name}.webp`,
        };

        return { ...metaData, name, src };
    } catch (error) {
        console.error("Erro ao criar a thumbnail:", error);
        throw error;
    }
};

export { createThumbnail };
