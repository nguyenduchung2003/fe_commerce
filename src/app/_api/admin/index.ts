"use server"
//login.tsx
import { revalidateTag } from "next/cache"
import fetchWithTokenRefresh from "@/app/_api/apiService"
export const uploads = async (formData: FormData) => {
     const res = await fetchWithTokenRefresh(
          "http://localhost:7070/admin/upload",
          {
               method: "POST",
               body: formData,
               cache: "no-store",
          }
     )
     if (!res.ok) console.log("Failed to fetch uploads img ")

     const data = await res.json()
     return data
}
// delete uploads
export const deleteUploads = async (fileName: string) => {
     const res = await fetchWithTokenRefresh(
          "http://localhost:7070/admin/delete",
          {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    fileName: `${fileName}`,
               }),
               cache: "no-store",
          }
     )

     if (!res.ok) console.log("Failed to fetch delete img ", res)

     const data = await res.json()
     return data
}
export const addProduct = async (product: products) => {
     const res = await fetchWithTokenRefresh(
          "http://localhost:7070/admin/addProduct",
          {
               method: "POST",
               body: JSON.stringify(product),
               headers: {
                    "Content-Type": "application/json",
               },
          }
     )
     if (!res.ok) console.log("Failed to fetch data add product ")

     const data = await res.json()
     revalidateTag("getAllProducts")
     return data
}

// delete product
export const deleteProduct = async (product: {
     productId: number
     variantId: number
     deleteVariant: boolean
}) => {
     const res = await fetchWithTokenRefresh(
          "http://localhost:7070/admin/deleteProduct",
          {
               method: "DELETE",
               body: JSON.stringify(product),
               headers: {
                    "Content-Type": "application/json",
               },
               cache: "no-store",
          }
     )
     if (!res.ok) console.log("Failed to fetch data delete product ")
     const data = await res.json()
     revalidateTag("getAllProducts")
     return data
}
// update product
export const updateProduct = async (productUpdate: products) => {
     const res = await fetchWithTokenRefresh(
          "http://localhost:7070/admin/updateProduct",
          {
               method: "PUT",
               body: JSON.stringify(productUpdate),
               headers: {
                    "Content-Type": "application/json",
               },
               cache: "no-store",
          }
     )

     if (!res.ok) console.log("Failed to fetch data update product ")

     const data = await res.json()
     revalidateTag("getAllProducts")
     return data
}
export async function getAllBills() {
     const res = await fetchWithTokenRefresh(
          `http://localhost:7070/admin/getAllBills`,
          {
               method: "GET",
               cache: "no-store",
               headers: {
                    "Content-Type": "application/json",
               },
               next: { tags: ["getBill"] },
          }
     )
     if (!res.ok) console.log("Failed to fetch data getBill")
     const data = await res.json()
     return data
}
// confirm order
export async function confirmOrder(dataConfirm: {
     order_id: number[]
     type: string
}) {
     const res = await fetchWithTokenRefresh(
          `http://localhost:7070/admin/confirmOrder`,
          {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(dataConfirm),
               cache: "no-store",
          }
     )
     if (!res.ok) console.log("Failed to fetch data confirmOrder")
     revalidateTag("getBill")
     const data = await res.json()
     return data
}

export async function sendEmail(dataSendEmail: {
     idUser: number
     notes: string
}) {
     const res = await fetchWithTokenRefresh(
          `http://localhost:7070/admin/sendEmail`,
          {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(dataSendEmail),
               cache: "no-store",
          }
     )
     if (!res.ok) console.log("Failed to fetch data dataSendEmail")
     const data = await res.json()
     return data
}
