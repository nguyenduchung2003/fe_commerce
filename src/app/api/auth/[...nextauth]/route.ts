// "use server"
import NextAuth, { JWT } from "next-auth"
import type { NextApiRequest, NextApiResponse } from "next"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"
import { signIn } from "@/app/_api/auth"
import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { jwtDecode } from "jwt-decode"
const handler = NextAuth({
     pages: {
          signIn: "/login",
          // signOut: "/",
          // error: "/error",
     },
     providers: [
          CredentialsProvider({
               name: "Credentials",
               // The credentials is used to generate a suitable form on the sign in page.
               // You can specify whatever fields you are expecting to be submitted.
               // e.g. domain, username, password, 2FA token, etc.
               // You can pass any HTML attribute to the <input> tag through the object.
               credentials: {
                    // username: {
                    //      label: "Username",
                    //      type: "text",
                    //      placeholder: "Username please",
                    //      required: true,
                    // },
                    password: {
                         label: "Password",
                         type: "password",
                         placeholder: "Passwork please",
                         required: true,
                    },
                    email: {
                         label: "Email",
                         type: "text",
                         placeholder: "Email please",
                         required: true,
                    },
               },
               async authorize(credentials, req) {
                    try {
                         // const user = await signIn({
                         //      email: credentials?.email as string,
                         //      password: credentials?.password as string,
                         // })

                         const res = await fetch(
                              "http://localhost:7070/auth/login",
                              {
                                   method: "POST",
                                   body: JSON.stringify({
                                        email: credentials?.email,
                                        password: credentials?.password,
                                   }),
                                   headers: {
                                        "Content-Type": "application/json",
                                   },
                              }
                         )

                         const user = await res.json()

                         if (res.ok) {
                              // user.email = credentials?.email
                              // console.log("User", user)
                              cookies().set({
                                   name: "AccessToken",
                                   value: user?.AccessToken,
                                   httpOnly: true,
                                   maxAge: 60 * 58,
                                   // expires: 60 * 60,
                              })
                              cookies().set({
                                   name: "RefreshToken",
                                   value: user?.RefreshToken,
                                   httpOnly: true,
                                   maxAge: 60 * 60 * 24 * 30,
                              })

                              return user
                         }

                         return null
                    } catch (error) {
                         console.log("Lỗi đăng nhập", error)
                    }
               },
          }),
     ],
     secret: process.env.NEXTAUTH_SECRET,
     events: {
          async signOut() {
               cookies().delete("AccessToken")
               cookies().delete("RefreshToken")
          },
     },
     callbacks: {
          // async signIn({ user, account, profile, email, credentials }) {
          // },
          // // async redirect({ url, baseUrl }) {
          // // },

          async session({ session, token, user }) {
               if (token.data) {
                    session.user = token.data
               }
               return session
          },
          jwt: async ({ token, user }) => {
               const cookieStore = cookies()
               const hasCookie = cookieStore.has("AccessToken")

               if (user) {
                    token.data = user
               }
               if (!hasCookie) {
                    const res = await fetch(
                         "http://localhost:7070/auth/refreshToken",
                         {
                              method: "POST",
                              headers: {
                                   "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                   token: (token as unknown as JWT).data
                                        .RefreshToken,
                              }),
                              cache: "no-store",
                         }
                    )

                    if (res.ok) {
                         const json = await res.json()
                         token = {
                              ...token,
                              AccessToken: json.access_token,
                              RefreshToken: json.refresh_token,
                         }
                         cookies().set({
                              name: "AccessToken",
                              value: json.access_token,
                              httpOnly: true,
                              maxAge: 60 * 58,
                         })
                    } else {
                         console.error(
                              `Failed to refresh token, status code: ${res.status}`
                         )
                    }
               }

               return token
          },
     },
})

export { handler as GET, handler as POST }
