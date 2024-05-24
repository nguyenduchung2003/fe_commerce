"use client"
import { Typography, Breadcrumbs, Box, Button } from "@mui/material"
import Link from "next/link"
import PictureProduct from "./PictureProduct"
import ContentProduct from "./ContentProduct"
import "./styleProduct.css"
import { getProductsWithCategory } from "@/app/_api/allRolls"
import { useEffect, useState } from "react"
import Image from "next/image"
import { DirectionAwareHover } from "./DirectionAwareHover"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
const ProductDetail = ({
    data,
    dataAllCategories,
}: {
    data: products
    dataAllCategories: dataGetAllCategoriesType[]
}) => {
    const router = useRouter()
    const nameCategory = dataAllCategories?.filter(
        (category) => category.id == data.category
    )
    const [dataSameProduct, setDataSameProduct] = useState<products[]>([])
    const [activeIndex, setActiveIndex] = useState<number>(0)
    useEffect(() => {
        const fetchData = async () => {
            const dataSameProduct = await getProductsWithCategory(data.category)
            console.log(dataSameProduct)
            setDataSameProduct((prev) =>
                dataSameProduct.products.filter(
                    (item: products) => item.id !== data.id
                )
            )
        }
        fetchData()
    }, [data])

    const onClickNextItem = () => {
        // if (activeIndex + 4 >= dataSameProduct.length) return

        setActiveIndex((prevIndex) => {
            return (prevIndex + 1) % dataSameProduct.length
        })
    }

    const onClickBackItem = () => {
        // if (activeIndex - 1 < 0) return
        setActiveIndex((prevIndex) => {
            return (
                (prevIndex - 1 + dataSameProduct.length) %
                dataSameProduct.length
            )
        })
    }

    return (
        <Box>
            <Box className="h-full w-full flex flex-col justify-center items-center">
                <Box className="flex flex-col gap-4 w-full">
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
            <Box className="mt-2  w-full] flex justify-center flex-col items-center">
                {dataSameProduct.length > 0 ? (
                    <>
                        <Typography variant="h4" className="text-center m-3">
                            Same category
                        </Typography>
                        <Box className="flex">
                            <AnimatePresence>
                                <Button
                                    className="hover:bg-[rgba(0,0,0,.75)] cursor-pointer mr-3"
                                    onClick={onClickBackItem}
                                >
                                    <ArrowBackIosNewIcon />
                                </Button>
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.5,
                                        }}
                                        className=" flex gap-3 items-center w-[1250px] max-w-[1300px] overflow-hidden "
                                    >
                                        {[...Array(4)].map((items, i) => {
                                            const item =
                                                dataSameProduct[
                                                    (activeIndex + i) %
                                                        dataSameProduct.length
                                                ]
                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{
                                                        x: 300,
                                                        opacity: 0.5,
                                                    }}
                                                    animate={{
                                                        x: 0,
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        x: -300,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        ease: "easeInOut",
                                                    }}
                                                    onClick={() => {
                                                        router.push(
                                                            "/products/" +
                                                                item.id
                                                        )
                                                    }}
                                                >
                                                    <DirectionAwareHover
                                                        imageUrl={item.image[0]}
                                                        className="h-[300px] w-[300px] shrink-0"
                                                        key={i}
                                                    >
                                                        <Box className="flex flex-col gap-3">
                                                            <Typography>
                                                                {item.name}
                                                            </Typography>
                                                            <Typography>
                                                                $
                                                                {Math.min(
                                                                    ...item.variants.map(
                                                                        (
                                                                            variant: any
                                                                        ) =>
                                                                            variant.price
                                                                    )
                                                                )}
                                                            </Typography>
                                                        </Box>
                                                    </DirectionAwareHover>
                                                </motion.div>
                                            )
                                        })}
                                    </motion.div>
                                </AnimatePresence>
                                <Button
                                    className="hover:bg-[rgba(0,0,0,.75)] cursor-pointer "
                                    onClick={onClickNextItem}
                                >
                                    <ArrowForwardIosIcon />
                                </Button>
                            </AnimatePresence>
                        </Box>
                    </>
                ) : null}
            </Box>
        </Box>
    )
}
export default ProductDetail
