"use server"
import { revalidateTag } from "next/cache"
import fetchWithTokenRefresh from "@/app/_api/apiService"
// get all products order
export async function getProductOrder(userId: number) {
    const res = await fetchWithTokenRefresh(
        `http://localhost:7070/user/getOrderdProduct?userId=${userId}`,
        {
            method: "GET",
            cache: "no-store",
            next: { tags: ["getProductOrder"] },
        }
    )
    if (!res.ok) console.log("Failed to fetch data getProductOrder")
    const data = await res.json()
    return data
}

//add to cart
export async function addProductToCart(productOrder: productOrder) {
    const res = await fetchWithTokenRefresh(
        `http://localhost:7070/user/addOrderdProduct`,
        {
            method: "POST",
            body: JSON.stringify(productOrder),
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    )
    if (!res.ok) {
        console.log("Failed to fetch data addProductToCart")
        return
    }

    revalidateTag("getProductOrder")

    const data = await res.json()
    return data
}
// delete product order
export async function deleteProductToCart(orderId: number) {
    const res = await fetchWithTokenRefresh(
        `http://localhost:7070/user/deleteProductInCart?orderID=${orderId}`,
        {
            method: "DELETE",
            cache: "no-store",
        }
    )

    if (!res.ok) console.log("Failed to fetch data deleteProductToCart")
    revalidateTag("getProductOrder")
    const data = await res.json()
    return data
}
//delete muiltiple products order
export async function deleteMultipleProductsInCart(deleteOrderId: {
    orderID: number[]
}) {
    console.log(deleteOrderId)
    const res = await fetchWithTokenRefresh(
        `http://localhost:7070/user/deleteMultipleProductsInCart`,
        {
            method: "POST",
            body: JSON.stringify(deleteOrderId),
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    )

    if (!res.ok)
        console.log("Failed to fetch data deleteMultipleProductsInCart")
    revalidateTag("getProductOrder")
    const data = await res.json()
    return data
}
// update product order
export async function updateProductToCart(dataUpdate: {
    orderID: number
    type: string
}) {
    const res = await fetchWithTokenRefresh(
        `http://localhost:7070/user/updateProductInCart`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataUpdate),
            cache: "no-store",
        }
    )
    if (!res.ok) console.log("Failed to fetch update addProductToCart")
    revalidateTag("getProductOrder")
    const data = await res.json()
    return data
}
// pay to cart
export async function payToCart(payToCart: payToCart) {
    const res = await fetchWithTokenRefresh(
        `http://localhost:7070/user/payToCart`,
        {
            method: "POST",
            body: JSON.stringify(payToCart),
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    )

    if (!res.ok) console.log("Failed to fetch data payToCart")
    revalidateTag("getProductOrder")
    revalidateTag("getBill")
    const data = await res.json()
    return data
}
// get all bill
export async function getBill(userId: number) {
    const res = await fetchWithTokenRefresh(
        `http://localhost:7070/user/getBills?userId=${userId}`,
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
