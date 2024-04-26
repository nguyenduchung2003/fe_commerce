"use client"
import {
    Box,
    Typography,
    Skeleton,
    Divider,
    Pagination,
    PaginationItem,
} from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
const HomeComponent = ({
    dataAllProducts,
}: {
    dataAllProducts: arrayProducts
}) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const pageNow = Number(searchParams.get("numberPage")) || 1
    const [loading, setLoading] = useState(true)

    const handleViewDetail = (id: number) => {
        router.push(`/products/${id}`)
    }
    return (
        <Box className="flex justify-center items-center flex-col gap-3 w-full">
            <Box className="flex w-full flex-wrap h-full flex-1  gap-6  justify-center">
                {dataAllProducts?.products?.map(
                    (item: products, index: number) => {
                        return (
                            <Box
                                key={index}
                                className="w-[300px] h-[350px]  flex flex-col justify-center item-center shadow-lg shadow-black bg-white"
                                onClick={() =>
                                    handleViewDetail(item.id as number)
                                }
                            >
                                <Box className="w-full h-[70%]  flex items-center justify-center ">
                                    {loading && (
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height="100%"
                                        />
                                    )}
                                    <Image
                                        src={item.image[0] as string}
                                        alt="Picture  product details"
                                        className="w-[100%] h-[100%] object-cover"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        placeholder="empty"
                                        priority={true}
                                        onLoad={() => setLoading(false)}
                                    />
                                </Box>
                                <Divider className="h-[10%]" />
                                <Box className="flex justify-evenly items-center h-[20%]">
                                    <Typography className="text-center w-[70%]">
                                        {item.name}
                                    </Typography>
                                    <Typography className="w-30%">
                                        $
                                        {Math.min(
                                            ...item.variants.map(
                                                (variant: any) => {
                                                    return variant.price
                                                }
                                            )
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    }
                )}
            </Box>
            <Pagination
                count={dataAllProducts.totalPage}
                shape="rounded"
                className="mt-5"
                page={pageNow}
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        href={`/page?numberPage=${item.page}&limit=12`}
                        {...item}
                    />
                )}
            />
        </Box>
    )
}
export default HomeComponent
