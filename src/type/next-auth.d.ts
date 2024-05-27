import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
    interface Session {
        user: {
            [x: string]: any
            AccessToken?: string
            RefreshToken?: string
            role?: string
            status?: string
            id?: number | string
            email?: string
        }
    }
    interface JWT {
        data: {
            AccessToken: string
            RefreshToken: string
            role: string
            status: string
            user_id: number | string
            email: string
        }
    }
}
