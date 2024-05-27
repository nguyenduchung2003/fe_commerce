"use server"
export async function login(account: {
    email: string
    password?: string
    type?: string
}) {
    const res = await fetch("http://localhost:7070/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: `${account.email}`,
            password: `${account.password}`,
            type: `${account.type}`,
        }),
        cache: "no-store",
    })
    if (!res.ok)
        return {
            error: "Failed to fetch data Login",
        }

    const data = await res.json()
    return data
}
//logOut
export async function signOutAPI(refreshToken: string) {
    const res = await fetch("http://localhost:7070/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refreshToken: `${refreshToken}`,
        }),
    })
    if (!res.ok)
        return {
            error: "Failed to fetch data logOut",
        }

    const data = await res.json()
    return data
}
//register.tsx
export async function signUp(account: {
    email: string
    password: string
    username: string
}) {
    const res = await fetch("http://localhost:7070/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: `${account.email}`,
            password: `${account.password}`,
        }),
    })
    if (!res.ok)
        return {
            error: "Failed to fetch data Register",
        }

    const data = await res.json()
    return data
}
export async function forgotPassword(email: string) {
    try {
        const res = await fetch(`http://localhost:7070/forgotPassword`, {
            method: "POST",
            body: JSON.stringify({ email: email }),
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}
