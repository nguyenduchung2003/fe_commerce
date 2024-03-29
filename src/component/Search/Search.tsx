"use client"
import { Box, Divider, Skeleton, Typography } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

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
               <Typography variant="h4">
                    Product search: {querySearch}
               </Typography>
               <Box className="flex w-full flex-wrap h-full flex-1 justify-evenly gap-6 ">
                    {dataAllProducts && dataAllProducts?.products?.length > 0
                         ? dataAllProducts?.products?.map(
                                (item: products, index: number) => {
                                     return (
                                          <Box
                                               key={index}
                                               className="w-[23%] h-[350px]  flex flex-col justify-center item-center shadow-lg shadow-black bg-white"
                                               onClick={() =>
                                                    handleViewDetail(
                                                         item.id as number
                                                    )
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
                                                         priority={true}
                                                         src={
                                                              item
                                                                   .image[0] as string
                                                         }
                                                         alt="Picture  product details"
                                                         className="w-[100%] h-[100%] object-cover"
                                                         width="0"
                                                         height="0"
                                                         sizes="100vw"
                                                         onLoad={() =>
                                                              setLoading(false)
                                                         }
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
                                                                   (
                                                                        variant: any
                                                                   ) => {
                                                                        return variant.price
                                                                   }
                                                              )
                                                         )}
                                                    </Typography>
                                               </Box>
                                          </Box>
                                     )
                                }
                           )
                         : "No products found."}
               </Box>
          </>
     )
}
export default Search
