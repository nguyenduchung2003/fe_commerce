"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
const Products = () => {
     const router = useRouter()

     useEffect(() => {
          router.push("/")
     }, [])
}
export default Products
