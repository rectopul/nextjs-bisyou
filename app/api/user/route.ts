import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import { UserByToken } from "@/util/auth";

export async function POST(request: NextRequest) {
    const { name, username, password, role } = await request.json();
    const authUtilities = new UserByToken();

    try {
        //check username aready exist
        const userFind = await prisma.user.findFirst({ where: { username } });

        if (userFind)
            return NextResponse.json(
                { error: `Usuário já cadastrado` },
                { status: 401 }
            );

        const password_hash = await authUtilities.hashPassword(password);

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
