"use client"
import { Box, Divider, Skeleton, Typography } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import CardHover from "@/component/CardHoverEffect/CardHoverEffect"
const Search = ({ dataAllProducts }: { dataAllProducts: arrayProducts }) => {
    const searchParams = useSearchParams()
    const querySearch = searchParams.get("q") as string
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const handleViewDetail = (id: number) => {
        router.push(`/products/${id}`)
    }

    return (
        <>
            <Typography variant="h4">Product search: {querySearch}</Typography>
            {dataAllProducts && dataAllProducts?.products?.length > 0 ? (
                <CardHover items={dataAllProducts?.products}></CardHover>
            ) : (
                <Box className="flex w-full flex-wrap h-full flex-1 justify-evenly gap-6 ">
                    No products found.{" "}
                </Box>
            )}
        </>
    )
}
export default Search
