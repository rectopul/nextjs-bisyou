import { NextRequest, NextResponse } from "next/server";
import { UserByToken } from "@/util/auth";

export const config = {
    matcher: ["/api/user/login"],
};

export async function authMiddleware(req: NextRequest) {
    try {
        const userByToken = new UserByToken();
        const cookies = req.cookies;
        const token = String(cookies.get("auth"));

        console.log(`token`, token);

        const user = await userByToken.checkToken(token);

        if (!user) {
            return NextResponse.redirect("/login");
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect("/login");
    }
}
