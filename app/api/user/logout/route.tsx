import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const requestHeaders = req.headers;
    const cookie = serialize("auth", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1, // 5 days
        path: "/",
    });

    const headers = {
        "Set-Cookie": cookie, // Include the cookie in the headers
    };

    const host = String(requestHeaders.get("host"));

    console.log(`host`, host);

    return NextResponse.json(
        { message: "Logout successful" },
        { headers, status: 200 }
    );
}
