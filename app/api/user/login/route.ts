import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import { UserByToken } from "@/util/auth";
import { NextApiResponse } from "next";
import { serialize } from "cookie";

export async function POST(request: NextRequest, res: NextApiResponse) {
    const requestHeaders = new Headers(request.headers);
    const { username, password } = await request.json();
    const auth = new UserByToken();

    try {
        //check username aready exist
        const user = await prisma.user.findFirst({ where: { username } });

        if (!user)
            return NextResponse.json(
                { name: `not found`, message: "whrong user or password" },
                { status: 401 }
            );

        const isPasswordValid = await auth.checkPassword({
            password,
            password_hash: user.password_hash,
        });

        const token = await auth.generateToken(user);

        if (!isPasswordValid) {
            return NextResponse.json(
                { name: `not found`, message: "whrong user or password" },
                { status: 401 }
            );
        }

        const cookie = serialize("auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 5, // 5 days
            path: "/",
        });

        const headers = {
            "Set-Cookie": cookie, // Include the cookie in the headers
        };

        return NextResponse.json(
            { message: token, user },
            { status: 200, headers }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    } finally {
        prisma.$disconnect();
    }
}
