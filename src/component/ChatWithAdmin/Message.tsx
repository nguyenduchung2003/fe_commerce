"use client"
import React, { use, useEffect } from "react"
import { Avatar, Box, Skeleton, Typography } from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
export const MessageLeft = (props: any) => {
    const { message = "no message", loading } = props

    return (
        <Box className="flex w-full">
            <Avatar className=" text-white w-10 h-10 ">
                <SmartToyIcon />
            </Avatar>
            <Box className="ml-5">
                <Box className="text-lg font-bold">Support Staff</Box>
                <Box className="bg-blue-300 p-1 rounded-lg inline-block ">
                    {loading ? (
                        <Skeleton
                            variant="rectangular"
                            width={210}
                            height={30}
                        />
                    ) : (
                        <Typography className="text-sm leading-normal">
                            {message}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export const MessageRight = (props: any) => {
    const { message = "no message" } = props

    return (
        <Box className="flex w-full justify-end">
            <Box className="ml-5 ">
                <Box className="text-lg font-bold relative right-5 flex justify-end">
                    Customer
                </Box>
                <Box className="bg-gray-300 p-1 rounded-lg inline-block float-right mr-2">
                    <Typography className="text-sm leading-normal">
                        {message}
                    </Typography>
                </Box>
            </Box>

            <Avatar className=" text-white w-10 h-10"></Avatar>
        </Box>
    )
}
