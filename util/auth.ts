import { UserDto } from "@/@types/user/UserDto";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

interface UserData {
    password: string;
    password_hash: string;
}

export interface GenerateTokenDTO {
    token: string;
}

export class UserByToken {
    private jwtService: typeof jwt;
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
        this.jwtService = jwt;
    }

    async generateToken(user: UserDto) {
        const payload = { id: user.id, user: user.username };
        const secret = process.env.TOKEN_SECRET;

        if (!secret) {
            throw new Error("APP_SECRET não está definido.");
        }

        return this.jwtService.sign(payload, secret, { expiresIn: "5d" });
        //return this.jwtService.sign(payload, { secret: process.env.APP_SECRET })
    }

    async checkPassword({ password, password_hash }: UserData) {
        try {
            return await bcrypt.compare(password, password_hash);
        } catch (error) {
            console.log(error);
        }
    }

    async checkToken(token: string) {
        if (!token) {
            throw new Error("Token not provided");
            //nada
        }

        try {
            const secret = process.env.TOKEN_SECRET;

            if (!secret) {
                throw new Error("APP_SECRET não está definido.");
            }
            const decoded = (await this.jwtService.verify(
                token,
                secret
            )) as jwt.JwtPayload;

            const { id } = decoded;

            const tokenRecord = await this.prisma.user.findFirst({
                where: { id },
            });

            if (!tokenRecord) {
                throw new Error("Token not exist or not valid");
            }

            return tokenRecord;
        } catch (error) {
            throw error;
        }
    }
}
