import { ApiErrorHandler } from "@/@types/ApiError";
import prisma from "@/lib/client";
import { UserByToken } from "@/util/auth";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AuthUser = new UserByToken();

interface UserUpdateInput extends Prisma.UserUpdateInput {
    currentPassword: string;
    password: string;
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url);
    const id = String(url.searchParams.get("id"));
    const body = (await req.json()) as UserUpdateInput;

    const user = await prisma.user.findFirst({
        where: { id: +id },
    });

    const { password, currentPassword } = body;

    if (!password || !currentPassword) {
        const error: ApiErrorHandler = {
            message: `The "password" and "settings" fields are required.`,
            name: "Missing required fields",
        };

        return NextResponse.json(error, { status: 400 });
    }

    if (!user) {
        const error: ApiErrorHandler = {
            message: `Usuário não existe`,
            name: "not found",
        };

        return NextResponse.json(error, { status: 400 });
    }

    const check = await AuthUser.checkPassword({
        password: currentPassword,
        password_hash: user.password_hash,
    });

    if (!check) {
        const error: ApiErrorHandler = {
            message: `não autorizado a realizar a ação.`,
            name: "Missing authorization",
        };

        return NextResponse.json(error, { status: 401 });
    }

    const password_hash = await AuthUser.hashPassword(body.password);
    const { name } = body;

    const updated = await prisma.user.update({
        where: { id: +id },
        data: {
            name,
            password_hash,
        },
    });

    return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = String(url.searchParams.get("id"));

    const partner = await prisma.partners.findFirst({
        where: { id: +id },
    });

    if (!partner) {
        const error: ApiErrorHandler = {
            message: `Parceiro não existe`,
            name: "not found",
        };

        return NextResponse.json(error, { status: 401 });
    }

    const deleted = await prisma.partners.delete({
        where: { id: +id },
    });

    return NextResponse.json(deleted);
}
