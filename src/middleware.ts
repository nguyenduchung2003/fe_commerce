import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"
import { withAuth } from "next-auth/middleware"

export default withAuth(
    async function middleware(request: NextRequest) {
        const cookieStore = cookies()
        const accessToken = cookieStore.get("AccessToken")

        const requestHeaders = new Headers(request.headers)
        requestHeaders.set("x-url", request.url)
        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        })

        response.headers.set(
            "AccessToken_userNow",
            accessToken?.value as unknown as string
        )
        return response
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // const role = (token as unknown as tokenJWT)?.data?.role
                // const pathname = req.nextUrl.pathname

                // if (
                //     (pathname.startsWith("/productmanagement/") ||
                //         pathname === "/confirmorder" ||
                //         pathname === "/productmanagement") &&
                //     role !== "ADMIN"
                // ) {
                //     return false
                // }

                return true
            },
        },
    }
)
