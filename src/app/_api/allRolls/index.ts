import { revalidateTag } from "next/cache"
import fetchWithTokenRefresh from "@/app/_api/apiService"
export const getAllCategories = async () => {
    const res = await fetch("http://localhost:7070/getProducts/category", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
    if (!res.ok) console.log("Failed to fetch data all categories ")

    const data = await res.json()
    return data
}
export const getAllProducts = async () => {
    const res = await fetch("http://localhost:7070/getProducts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: { tags: ["getAllProducts"] },
    })
    if (!res.ok) console.log("Failed to fetch data all products ")

    const data = await res.json()
    return data
}
export const divisionPage = async (numberPage: number, limit: number) => {
    const res = await fetch(
        `http://localhost:7070/productOfPage?numberPage=${numberPage}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    )

    if (!res.ok) console.log("Failed to fetch data division Page product ")
    const data = await res.json()
    // revalidateTag("getAllProducts")
    return data
}

export const getProductsWithCategory = async (categorieID: number) => {
    const res = await fetch(
        `http://localhost:7070/getProducts/category/${categorieID}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    )
    if (!res.ok) console.log("Failed to fetch data getProductsWithCategory ")
    const data = await res.json()
    return data
}
//productId.tsx
export async function detailData(productId: number) {
    const res = await fetch(`http://localhost:7070/getProducts/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
    if (!res.ok) console.log("Failed to fetch data detailData")
    const data = await res.json()
    return data
}
// search product
export async function searchProducts(searchText: string, categoryId?: number) {
    const res = await fetch(
        `http://localhost:7070/getProducts/search?name=${searchText}${
            categoryId ? "&category=" + categoryId : ""
        }`,
        {
            method: "GET",
            // next: { tags: ["dataSearch"] },
            cache: "no-store",
        }
    )
    if (!res.ok) console.log("Failed to fetch data searchProducts")
    const data = await res.json()
    return data
}
export async function askAI(text: string) {
    const res = await fetch(`http://localhost:7070/askAI`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ text: text }),
    })
    if (!res.ok) console.log("Failed to fetch data askAI")
    const data = await res.json()
    return data
}
export async function getListChat({
    senderId,
    receiverId,
    page,
    pageSize,
}: {
    senderId: number
    receiverId: number
    page: number
    pageSize?: number
}) {
    const res = await fetch(`http://localhost:7070/getListChat`, {
        method: "POST",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            senderId: senderId,
            receiverId: receiverId,
            page: page,
            pageSize: pageSize,
        }),
        next: { tags: ["getListChat"] },
    })
    if (!res.ok) console.log("Failed to fetch data getListChat")

    const data = await res.json()
    return data
}
