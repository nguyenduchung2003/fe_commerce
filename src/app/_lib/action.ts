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
export async function toastCustom(
     type: TypeOptions | null | undefined,
     message: string,
     options?: (<T = {}>(props: T) => void) | null | undefined
) {
     return toast.update(toast.loading("Loading..."), {
          render: message,
          type: type,
          position: "top-right",
          isLoading: false,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          onClose: options,
     })
}
