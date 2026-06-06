// types/next-auth.d.ts

import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id?: string;
        username?: string;

        accessToken?: string;
        refreshToken?: string;

        tokenType?: string;

        expiresIn?: number;
        refreshExpiresIn?: number;

        error?: string;
    }

    interface Session {
        user: {
            id?: string;
            username?: string;
        } & DefaultSession["user"];

        accessToken?: string;
        refreshToken?: string;

        tokenType?: string;

        expiresIn?: number;
        refreshExpiresIn?: number;

        error?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id?: string;
        username?: string;

        accessToken?: string;
        refreshToken?: string;

        tokenType?: string;

        expiresIn?: number;
        refreshExpiresIn?: number;

        error?: string;
    }
}