"use client"

import { cn } from "@/utils/cn"
import { Box, List, ListItem, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string
        name: string
        title: string
    }[]
    direction?: "left" | "right"
    speed?: "fast" | "normal" | "slow"
    pauseOnHover?: boolean
    className?: string
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const scrollerRef = React.useRef<HTMLUListElement>(null)

    useEffect(() => {
        addAnimation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [start, setStart] = useState(false)
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                )
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                )
            }
        }
    }
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "20s"
                )
            } else if (speed === "normal") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "40s"
                )
            } else {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "80s"
                )
            }
        }
    }
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children)

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true)
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem)
                }
            })

            getDirection()
            getSpeed()
            setStart(true)
        }
    }

    return (
        <Box
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <List
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <ListItem
                        className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] list-none"
                        style={{
                            background:
                                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                        }}
                        key={item.name}
                    >
                        <blockquote>
                            <Box
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></Box>
                            <Typography className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                                {item.quote}
                            </Typography>
                            <Box className="relative z-20 mt-6 flex flex-row items-center">
                                <Box className="flex flex-col gap-1">
                                    <Typography className=" text-sm leading-[1.6] text-gray-400 font-normal">
                                        {item.name}
                                    </Typography>
                                    <Typography className=" text-sm leading-[1.6] text-gray-400 font-normal">
                                        {item.title}
                                    </Typography>
                                </Box>
                            </Box>
                        </blockquote>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
export default InfiniteMovingCards
