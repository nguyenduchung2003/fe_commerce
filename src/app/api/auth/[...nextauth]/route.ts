// "use server"
import NextAuth, { JWT } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"
import { login } from "@/app/_api/auth"
const handler = NextAuth({
    // pages: {
    //     signIn: "/login",
    //     // signOut: "/",
    //     // error: "/error",
    // },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
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
                    const res = await fetch(
                        "http://localhost:7070/auth/login",
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password,
                                type: "credentials",
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )

                    const user = await res.json()

                    if (res.ok) {
                        cookies().set({
                            name: "AccessToken",
                            value: user?.AccessToken,
                            httpOnly: true,
                            maxAge: 60 * 58,
                        })
                        cookies().set({
                            name: "RefreshToken",
                            value: user?.RefreshToken,
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 30,
                        })
                        cookies().set({
                            name: "userid",
                            value: user?.id,
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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    events: {
        async signOut() {
            cookies().delete("AccessToken")
            cookies().delete("RefreshToken")
            cookies().delete("userid")
        },
    },
    callbacks: {
        async signIn({
            user,
            account,
            profile,
        }: {
            user: any
            account: any
            profile?: { email_verified?: boolean; email?: string }
        }) {
            if (account && account.provider === "google") {
                console.log("account111111")
                try {
                    const result = await login({
                        email: profile?.email!,
                        type: "google",
                    })
                    if (result.error) {
                        return "/"
                    } else {
                        cookies().set({
                            name: "AccessToken",
                            value: result.AccessToken,
                            httpOnly: true,
                            maxAge: 60 * 58,
                        })
                        cookies().set({
                            name: "RefreshToken",
                            value: result?.RefreshToken,
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 30,
                        })
                        cookies().set({
                            name: "userid",
                            value: result.id,
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 30,
                        })
                        user.data = result
                        return (
                            profile?.email_verified !== undefined &&
                            profile?.email_verified &&
                            ((profile?.email?.endsWith("@gmail.com") ||
                                profile?.email?.endsWith("@hnue.edu.vn")) ??
                                false)
                        )
                    }
                } catch (error) {
                    return "/"
                }
            }
            return true
        },

        async session({ session, token, user }) {
            if (token.data) {
                session.user = token.data
            }
            if (session.user.data) {
                session.user = session.user.data
            }

            return session
        },
        jwt: async ({ token, user }) => {
            const cookieStore = cookies()
            const hasCookie = cookieStore.has("AccessToken")
            const refreshToken = cookieStore.get("RefreshToken")

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
                            token:
                                (token as unknown as JWT).data.RefreshToken ||
                                token?.RefreshToken ||
                                refreshToken?.value,
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
