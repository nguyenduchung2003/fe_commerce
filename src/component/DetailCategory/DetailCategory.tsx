"use client"
import {
    Box,
    Divider,
    InputAdornment,
    Skeleton,
    TextField,
    Typography,
} from "@mui/material"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import SearchIcon from "@mui/icons-material/Search"
import { toastCustom } from "../Custom/CustomToast"
const DetailCategory = ({ data }: { data: arrayProducts }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    const handleViewDetail = (id: number) => {
        router.push(`/products/${id}`)
    }
    const [textSearch, setTextSearch] = useState<string>("")
    return (
        <Box className="flex flex-col gap-2 w-full">
            <Box className="flex items-center justify-between">
                <Typography variant="h4">
                    Product type: {data.category}
                </Typography>
                {data.products.length > 0 ? (
                    <TextField
                        id="input-with-icon-textfield"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                        placeholder="Search for products by name in the category..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        fontSize="small"
                                        onClick={() => {
                                            if (textSearch) {
                                                router.push(`?q=${textSearch}`)
                                            } else {
                                                toastCustom(
                                                    "error",
                                                    "Please enter search keywords"
                                                )
                                            }
                                        }}
                                        className=" cursor-pointer"
                                    />
                                </InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (textSearch) {
                                    router.push(`?q=${textSearch}`)
                                } else {
                                    toastCustom(
                                        "error",
                                        "Please enter search keywords"
                                    )
                                }
                            }
                        }}
                        variant="outlined"
                        fullWidth
                        className="px-2 py-1 w-[30%]"
                    />
                ) : null}
            </Box>
            <Box>
                {data.products.length > 0 ? (
                    <Box className="flex  flex-wrap   gap-6 ">
                        {data?.products.map((item: any, index: number) => {
                            return (
                                <Box
                                    key={index}
                                    className="w-[300px] h-[350px]  flex flex-col justify-center item-center shadow-lg shadow-black bg-white"
                                    onClick={() =>
                                        handleViewDetail(item.id as number)
                                    }
                                >
                                    <Box className="w-full h-[300px]  flex items-center justify-center ">
                                        {loading && (
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                // height="100%"
                                            />
                                        )}

                                        <Image
                                            src={item.image[0] as string}
                                            alt="Picture  product details"
                                            className="w-[100%] h-[100%] object-cover"
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            onLoad={() => setLoading(false)}
                                            priority={true}
                                        />
                                    </Box>
                                    <Divider className="h-[10px]" />
                                    <Box className="flex justify-evenly items-center h-[40px]">
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
                        })}
                    </Box>
                ) : (
                    <Typography>Now, list don't have product</Typography>
                )}
            </Box>
        </Box>
    )
}
export default DetailCategory
