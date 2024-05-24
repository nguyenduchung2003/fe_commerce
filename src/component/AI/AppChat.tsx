import React, { use, useEffect, useRef, useState } from "react"
import TextInput from "./InputChat"
import { MessageLeft, MessageRight } from "./Message"
import { Box, Button, Paper, Skeleton, Typography } from "@mui/material"
import Dialog from "./Dialog"

export default function App({
    setOpen,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [loading, setLoading] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>("")
    const [message, setMessage] = useState<
        {
            role: string
            message: string
        }[]
    >([])
    const [openDiaLog, setOpenDiaLog] = useState<boolean>(false)
    const handlerOffAI = () => {
        setOpenDiaLog(true)
    }
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [message])
    useEffect(() => {
        console.log("loading", loading)
    }, [loading])
    return (
        // <div className="flex items-center justify-center w-[400px]">
        <>
            {openDiaLog ? (
                <Dialog
                    openDiaLog={openDiaLog}
                    setOpenDiaLog={setOpenDiaLog}
                    setOpen={setOpen}
                />
            ) : null}
            <Paper className="w-[400px] h-[80vh] flex flex-col items-center justify-around gap-3">
                <Box className="flex w-full justify-center items-center">
                    <Typography className="mt-2">Chat with Hung'AI</Typography>
                    <Button className="absolute right-0" onClick={handlerOffAI}>
                        X
                    </Button>
                </Box>

                <Box className="w-[400px]  flex flex-col items-center relative gap-3 overflow-auto h-[70vh]">
                    <MessageLeft message="Hello I am Hung'AI, Can I help you?" />

                    {message.map((item, index) => {
                        if (item.role === "user") {
                            return (
                                <MessageRight
                                    key={index}
                                    message={item.message}
                                />
                            )
                        } else {
                            return (
                                <MessageLeft
                                    key={index}
                                    message={item.message}
                                    loading={
                                        loading && index === message.length - 1
                                    }
                                />
                            )
                        }
                    })}
                    {loading ? <MessageLeft loading={loading} /> : null}
                    <div ref={messagesEndRef} />
                </Box>
                <TextInput
                    question={question}
                    setQuestion={setQuestion}
                    setMessage={setMessage}
                    setLoading={setLoading}
                />
            </Paper>
        </>
        // </div>
    )
}
