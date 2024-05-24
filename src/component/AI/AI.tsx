"use client"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import { Button, Box, Typography, Tooltip } from "@mui/material"
import "@/component/AI/AI.css"
import TypeWriter from "../Home/TypeWriter/TypeWriter"
const title = "Hello I am Hung'AI, Can I help you?"
import AppChat from "./AppChat"
import { useState } from "react"
const words = title.split(" ").map((word) => {
    return {
        text: word,
        className: "text-sm ",
    }
})
const AI = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Box className="fixed z-[100] bottom-10 right-0 flex flex-col justify-center items-center gap-5">
            {open ? (
                <AppChat setOpen={setOpen} />
            ) : (
                <>
                    <Box className="triangle relative  h-[40px] bg-gray-300 rounded-lg flex justify-center items-center pl-2">
                        <TypeWriter
                            words={words}
                            className=" h-[40px]  flex justify-center items-center "
                            check={true}
                        ></TypeWriter>
                    </Box>

                    <Button
                        onClick={() => setOpen(true)}
                        className="w-[64px] h-[64px] bg-[rgb(62,115,199)] text-white hover:bg-[rgb(87,142,230)] flex items-center justify-center"
                    >
                        <SmartToyIcon className="text-4xl" />
                    </Button>
                </>
            )}
        </Box>
    )
}

export default AI
