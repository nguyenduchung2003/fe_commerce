import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: false,
    preload: true,
})
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata: Metadata = {
    title: "Ecommerce Website",
    description: "Generated by create next app",
}
import AuthProvider from "@/provider/AuthProvider"
import "react-toastify/dist/ReactToastify.css"
import Nav from "@/component/Navbar/Nav"

import { ToastContainer } from "react-toastify"
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning={true}>
                <AuthProvider>
                    <ToastContainer />
                    <Nav />
                    {children}
                </AuthProvider>
                <SpeedInsights />
            </body>
        </html>
    )
}
