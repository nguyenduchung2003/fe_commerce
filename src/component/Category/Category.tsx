"use client"
import { Box } from "@mui/material"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { usePathname } from "next/navigation"
const Category = ({
    dataAllCategories,
    checkPage,
}: {
    dataAllCategories: dataGetAllCategoriesType[]
    checkPage: boolean
}) => {
    const router = useRouter()
    const pathname = usePathname()

    const handleCategory = (item: number) => {
        router.push(checkPage ? `${item}` : `/products/category/${item}`)
    }
    return (
        <>
            <Box className="shadow-lg shadow-black h-[100%] flex justify-center items-center flex-col gap-10 bg-white">
                <Box className="pt-[40px]">Categories</Box>
                <Box className="flex justify-center items-center flex-col  w-[150px] pb-[10px] gap-1">
                    {dataAllCategories?.map((item, index: number) => {
                        return (
                            <Box
                                key={index}
                                className={`w-[100%] h-[50px] flex justify-center items-center  hover:bg-black hover:text-white cursor-pointer ${
                                    pathname === `/products/category/${item.id}`
                                        ? "bg-black text-white"
                                        : ""
                                }`}
                                onClick={() => handleCategory(item.id)}
                            >
                                <Box>{item.category}</Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}
export default Category
