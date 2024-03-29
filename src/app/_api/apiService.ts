"use server"
import { cookies } from "next/headers"

export default async function fetchWithTokenRefresh(url: string, options: any) {
     const cookieStore = cookies()
     const hasCookie = cookieStore.has("AccessToken")
     const refreshToken = cookieStore.get("RefreshToken")?.value

     if (!hasCookie) {
          const res = await fetch("http://localhost:7070/auth/refreshToken", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    token: refreshToken,
               }),
          })

          if (res.ok) {
               const data = await res.json()
               cookies().set({
                    name: "AccessToken",
                    value: data.access_token,
                    httpOnly: true,
                    maxAge: 60 * 58,
               })
          }
     }

     options.headers = {
          ...options.headers,
          Authorization: `Bearer ${cookieStore.get("AccessToken")?.value}`,
     }

     return fetch(url, options)
}
