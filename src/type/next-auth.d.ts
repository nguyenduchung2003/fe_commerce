import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
     interface Session {
          user: {
               AccessToken?: string
               RefreshToken?: string
               role?: string
               status?: string
               id?: number
               email?: string
          }
     }
     interface JWT {
          data: {
               AccessToken: string
               RefreshToken: string
               role: string
               status: string
               user_id: number
               email: string
          }
     }
}
