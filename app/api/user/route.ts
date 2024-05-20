import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/client";

export async function POST(request: NextRequest) {
    const { name, username, password, role } = await request.json();

    try {
        //check username aready exist
        const userFind = await prisma.user.findFirst({ where: { username } });

        if (userFind)
            return NextResponse.json(
                { error: `Usuário já cadastrado` },
                { status: 401 }
            );

        const password_hash = await bcrypt.hashSync(password, 12);

        const userCreated = await prisma.user.create({
            data: { name, username, password_hash, role },
        });

        return Response.json(userCreated);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    } finally {
        prisma.$disconnect();
    }
}
