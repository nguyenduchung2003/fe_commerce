"use server"
import { cookies } from "next/headers"
import { TypeOptions, toast } from "react-toastify"
export async function checkAccessToken() {
    const cookieStore = cookies()
    return cookieStore.has("AccessToken")
}
export async function getUserId() {
    const cookieStore = cookies()
    const id = Number(cookieStore.get("userid")?.value)
    return id ? id : null
}
