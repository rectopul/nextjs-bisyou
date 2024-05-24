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

        const name: string = String(outputPath.split("/").at(-1));
        return { ...metaData, name };
    } catch (error) {
        console.error("Erro ao criar a thumbnail:", error);
        throw error;
    }
};

export { createThumbnail };
