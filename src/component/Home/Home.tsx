"use client"
import {
    Box,
    Typography,
    Skeleton,
    Divider,
    Pagination,
    PaginationItem,
    Chip,
} from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import CardHover from "@/component/CardHoverEffect/CardHoverEffect"
import FeedBack from "@/component/FeedBack/FeedBack"
import TypeWriter from "./TypeWriter/TypeWriter"
const HomeComponent = ({
    dataAllProducts,
}: {
    dataAllProducts: arrayProducts
}) => {
    const searchParams = useSearchParams()

    const pageNow = Number(searchParams.get("numberPage")) || 1
    const feedbackProducts = [
        {
            quote: "This product exceeded my expectations!",
            name: "John Doe",
            title: "Satisfied Customer",
        },
        {
            quote: "I love how user-friendly this product is.",
            name: "Jane Smith",
            title: "Happy User",
        },
        {
            quote: "The quality of this product is unmatched.",
            name: "Chris Johnson",
            title: "Impressed Customer",
        },
        {
            quote: "Using this product has greatly improved my workflow.",
            name: "Emily Brown",
            title: "Productivity Enthusiast",
        },
        {
            quote: "I've tried many similar products, but this one stands out.",
            name: "Alex Wang",
            title: "Tech Enthusiast",
        },
        {
            quote: "Excellent customer service! They were very helpful.",
            name: "Sarah Lee",
            title: "Happy Customer",
        },
    ]
    const title = "Welcome to our store"
    const words = title.split(" ").map((word) => {
        if (word === "store") {
            return {
                text: word,
                className:
                    "text-6xl text-center text-blue-500 dark:text-blue-500",
            }
        }
        return {
            text: word,
            className: "text-5xl text-center",
        }
    })
    const refProduct = useRef<HTMLDivElement>(null)
    const [check, setCheck] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (refProduct.current) {
                if (window.scrollY <= 170) {
                    setCheck(false)
                } else {
                    setCheck(true)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <Box className="flex justify-center items-center flex-col gap-3 w-full h-full ">
            <Box className="flex justify-center items-center flex-col  w-full">
                <TypeWriter words={words} check={false}></TypeWriter>
                <Typography variant="h4" className="">
                    We have the best products at the best prices
                </Typography>
            </Box>
            <Box className="flex  flex-col  w-full ">
                <Box
                    className={`w-full h-10 text-center bg-black text-white leading-[40px]  ${
                        check ? "sticky top-[80px] z-[51]" : "static"
                    }`}
                    ref={refProduct}
                >
                    Product
                </Box>
                <CardHover
                    items={dataAllProducts?.products}
                    className="w-full"
                />
                <Pagination
                    count={dataAllProducts.totalPage}
                    shape="rounded"
                    className="mt-5 w-full flex justify-center items-center "
                    page={pageNow}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            href={`/page?numberPage=${item.page}&limit=8`}
                            {...item}
                        />
                    )}
                />
            </Box>
            <Divider className="w-full" />

            <Box
                className={`w-full h-10 text-center bg-black text-white leading-[40px]`}
            >
                FeedBack
            </Box>
            <FeedBack items={feedbackProducts}></FeedBack>
        </Box>
    )
}
export default HomeComponent
