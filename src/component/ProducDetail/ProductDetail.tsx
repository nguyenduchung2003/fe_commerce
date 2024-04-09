"use client"
import { Typography, Breadcrumbs, Box } from "@mui/material"
import Link from "next/link"
import PictureProduct from "./PictureProduct"
import ContentProduct from "./ContentProduct"
import "./styleProduct.css"

const ProductDetail = ({
    data,
    dataAllCategories,
}: {
    data: products
    dataAllCategories: dataGetAllCategoriesType[]
}) => {
    const nameCategory = dataAllCategories?.filter(
        (category) => category.id == data.category
    )

    return (
        <>
            <Box className="h-full min-w-[1300px]">
                <Box className="flex flex-col gap-4 ">
                    <Box role="presentation" className="pl-5 flex items-start">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                href="/"
                                className="no-underline text-black hover:underline"
                                prefetch={false}
                            >
                                Home
                            </Link>
                            <Link
                                href={`/products/category/${data?.category}`}
                                className="no-underline text-black hover:underline"
                                prefetch={false}
                            >
                                {nameCategory[0]?.category}
                            </Link>
                            <Typography color="text.primary">
                                {data?.name}
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    <Box className="flex flex-col gap-4 items-center bg-white">
                        <Box className="flex justify-center gap-7  w-[80%] ">
                            <Box className="flex justify-center items-center flex-col gap-4 p-5 w-[50%] h-full">
                                <PictureProduct data={data} />
                            </Box>
                            <Box className="p-5 w-[50%]">
                                <ContentProduct dataProduct={data} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default ProductDetail
