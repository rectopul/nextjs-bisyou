import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export async function checkToken(token: string, host: string) {
    if (!token) {
        throw new Error("Token not provided");
        //nada
    }

    try {
        const secret = process.env.TOKEN_SECRET;

        if (!secret) {
            throw new Error("APP_SECRET não está definido.");
        }

        const decoded: any = await jwtVerify(
            token,
            new TextEncoder().encode(secret)
        );

        const { id } = decoded.payload;

        const url = `http://${host}/api/auth/${id}`;

        const check = await fetch(url);

        if (!check.ok) {
            throw new Error("Unauthenticated");
        }

        return check;
    } catch (error) {
        throw error;
    }
}
