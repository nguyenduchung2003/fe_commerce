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
import HoverEffect from "../CardHoverEffect/CardHoverEffect"
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
                    <HoverEffect items={data?.products}></HoverEffect>
                ) : (
                    <Typography>Now, list don't have product</Typography>
                )}
            </Box>
        </Box>
    )
}
export default DetailCategory
