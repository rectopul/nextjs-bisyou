import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { checkToken } from "./util/checkJwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    try {
        if(req.nextUrl.pathname.startsWith('api/pages')) {
            if (req.method === "POST") {
                const cookie = cookies();
                const headers = req.headers;
    
                if (!cookie) {
                    return NextResponse.json(
                        {
                            name: "unauthenticated",
                            message: "Usuário não autenticado",
                        },
                        { status: 401 }
                    );
                }
    
                const authorization = headers.get("Authorization");
    
                const [, bToken] = String(authorization).split(" ");
    
                console.log(`Bearer token recebido`, bToken);
    
                const token = String(cookie.get("auth")?.value);
    
                if (!bToken) {
                    return NextResponse.json(
                        {
                            name: "unauthenticated",
                            message: "Usuário não autenticado",
                        },
                        { status: 401 }
                    );
                } else {
                    if (bToken !== token) {
                        return NextResponse.json(
                            {
                                name: "unauthenticated",
                                message: "Usuário não autenticado",
                            },
                            { status: 401 }
                        );
                    }
                }
    
                const user = await checkToken(token, String(headers.get("host")));
    
                if (!user) {
                    return NextResponse.json(
                        {
                            name: "unauthenticated",
                            message: "Usuário não autenticado",
                        },
                        { status: 401 }
                    );
                }
    
                return NextResponse.next();
            } else {
                return NextResponse.next();
            }
        }

        const requestHeaders = new Headers(req.headers)

        requestHeaders.set('x-pathname', req.nextUrl.pathname)

        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
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
