import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: false,
})

import Navbar from "@/component/Navbar/Nav"
import FooterPage from "@/component/FooterPage/FooterPage"
import AuthProvider from "@/provider/AuthProvider"
export const metadata: Metadata = {
    title: "Ecommerce Website",
    description: "Generated by create next app",
}
export const dynamic = "force-dynamic"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import AI from "@/component/AI/AI"
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} flex flex-col min-h-screen`}
                suppressHydrationWarning={true}
            >
                <AuthProvider>
                    <ToastContainer />
                    <Navbar />
                    <div className="pt-[90px] grow">{children}</div>
                    <AI></AI>
                    <FooterPage />
                </AuthProvider>
                <SpeedInsights />
            </body>
        </html>
    )
}
