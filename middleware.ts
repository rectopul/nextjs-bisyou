import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { checkToken } from "./util/checkJwt";

const corsOptions = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Origin": "*",
};

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    try {
        const requestHeaders = new Headers(req.headers);
        const origin = requestHeaders.get("origin") ?? "";

        // Handle preflighted requests
        const isPreflight = req.method === "OPTIONS";

        requestHeaders.set("x-pathname", req.nextUrl.pathname);

        const preflightHeaders = {
            ...corsOptions,
        };
        
        if (req.nextUrl.pathname.startsWith("api/pages")) {
            if (req.method === "POST") {
                const cookie = cookies();
                const headers = req.headers;

                if (!cookie) {
                    return NextResponse.json(
                        {
                            name: "unauthenticated",
                            message: "Usuário não autenticado",
                        },
                        {
                            status: 401,
                            headers: { ...preflightHeaders, ...requestHeaders },
                        }
                    );
                }

                const authorization = headers.get("Authorization");

                const [, bToken] = String(authorization).split(" ");

                const token = String(cookie.get("auth")?.value);

                if (!bToken) {
                    return NextResponse.json(
                        {
                            name: "unauthenticated",
                            message: "Usuário não autenticado",
                        },
                        {
                            status: 401,
                            headers: { ...preflightHeaders, ...requestHeaders },
                        }
                    );
                } else {
                    if (bToken !== token) {
                        return NextResponse.json(
                            {
                                name: "unauthenticated",
                                message: "Usuário não autenticado",
                            },
                            {
                                status: 401,
                                headers: {
                                    ...preflightHeaders,
                                    ...requestHeaders,
                                },
                            }
                        );
                    }
                }

                const user = await checkToken(
                    token,
                    String(headers.get("host"))
                );

                if (!user) {
                    return NextResponse.json(
                        {
                            name: "unauthenticated",
                            message: "Usuário não autenticado",
                        },
                        {
                            status: 401,
                            headers: { ...preflightHeaders, ...requestHeaders },
                        }
                    );
                }

                return NextResponse.next({
                    request: {
                        headers: {
                            ...preflightHeaders,
                            ...requestHeaders,
                        },
                    },
                });
            } else {
                return NextResponse.next();
            }
        }

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { name: "unauthenticated", message: "Usuário não autenticado" },
            { status: 401 }
        );
    }
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: ["/api/pages/category/:path*", "/api/pages"],
// };
