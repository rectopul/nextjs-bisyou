import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        if (!params) {
            throw new Error(`please send a ID`);
        }

        const id = parseInt(params.id);

        const user = await prisma.user.findFirst({ where: { id } });

        if (!user) {
            throw new Error(`Unauthenticated`);
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        throw error;
    }
}
