import { NextRequest } from "next/server";
import prisma from "@/lib/client";
import { fileCreator } from "@/util/fileCreator";

/**
 *
 * @param request
 * @returns
 *
 */
export const dynamic = "force-dynamic";
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const formData = await req.formData();
    const file: any = formData.get("file");

    try {
        if (file) {
            //Criação da página
            const { id } = params;

            const { src } = await fileCreator(file);

            const partner = await prisma.settings.update({
                data: { logo: src },
                where: { id: +id },
            });

            return Response.json(partner);
        }

        return Response.json(
            { name: "image not found", message: "por favor envie a imagem" },
            { status: 400 }
        );
    } catch (error) {
        console.log(`erro no banner`, error);
        return Response.json(error, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
