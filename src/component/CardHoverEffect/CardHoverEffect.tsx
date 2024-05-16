"use client"
import { cn } from "@/utils/cn"
import { Box, Divider, Typography } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const HoverEffect = ({
    items,
    className,
}: {
    items: products[]
    className?: string
}) => {
    const router = useRouter()
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const handleViewDetail = (id: number) => {
        router.push(`/products/${id}`)
    }
    return (
        <Box className="flex w-full flex-wrap h-full flex-1  justify-center">
            {items.map((item: products, index: number) => {
                return (
                    <Box
                        key={index}
                        // className="w-[300px] h-[350px]   flex-col justify-center item-center shadow-lg shadow-black bg-white relative group  block "
                        className="relative group  block p-4 w-[300px] h-[350px]  justify-center item-center  "
                        onClick={() => handleViewDetail(item.id as number)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === index && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  "
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            duration: 0.15,
                                            delay: 0.2,
                                        },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <Card>
                            <Box className="w-full h-[80%]  flex items-center justify-center ">
                                <Image
                                    src={item.image[0] as string}
                                    alt="Picture  product details"
                                    className="w-[100%] h-[100%] object-cover"
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    placeholder="empty"
                                    priority={true}
                                />
                            </Box>
                            <Divider className="h-[5%]" />
                            <Box className="flex justify-evenly items-center h-[15%]">
                                <Typography className="text-center w-[50%]">
                                    {item.name}
                                </Typography>
                                <Typography className="w-30%">
                                    $
                                    {Math.min(
                                        ...item.variants.map((variant: any) => {
                                            return variant.price
                                        })
                                    )}
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                )
            })}
        </Box>
    )
}

export default HoverEffect
export const Card = ({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) => {
    return (
        <Box
            className={cn(
                " h-full w-full overflow-hidden  border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 ",
                className
            )}
        >
            <Box className="relative z-50 h-full w-full">
                <Box className="h-full w-full shadow-lg shadow-black bg-white">
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
