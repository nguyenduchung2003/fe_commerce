import React, { use, useEffect, useRef, useState } from "react"
import TextInput from "./InputChat"
import { MessageLeft, MessageRight } from "./Message"
import { Box, Button, Paper, Skeleton, Typography } from "@mui/material"
import { get } from "http"
import { getUserId } from "@/app/_lib/action"
import socket from "@/utils/socket"

export default function App({
    setOpen,
    dataChat,
    setDataChat,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    dataChat: message[]
    setDataChat: React.Dispatch<React.SetStateAction<message[]>>
}) {
    const [loading, setLoading] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>("")
    const [userId, setUserId] = useState<number>(0)
    useEffect(() => {
        const getId = async () => {
            const userId = await getUserId()
            setUserId(userId!)
        }
        getId()
    }, [])

    useEffect(() => {
        const roomId = [userId, 3].sort().join("-")
        const handleUserChat = (data: any) => {
            setDataChat((prev) => [...prev, data])
        }

        socket.on(roomId, handleUserChat)

        return () => {
            socket.off(roomId, handleUserChat)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [dataChat])
    useEffect(() => {
        console.log("dataChat", dataChat)
    }, [dataChat])

    return (
        <>
            <Paper className="w-[400px] h-[80vh] flex flex-col items-center justify-around gap-3">
                <Box className="flex w-full justify-center items-center">
                    <Typography className="mt-2">
                        Chat with support staff
                    </Typography>
                    <Button
                        className="absolute right-0"
                        onClick={() => setOpen(false)}
                    >
                        X
                    </Button>
                </Box>

                <Box className="w-[400px]  flex flex-col items-center relative gap-3 overflow-auto h-[70vh]">
                    <MessageLeft message="Hello I am support staff, Can I help you?" />

                    {dataChat?.map((item, index) => {
                        if (item.senderId === userId) {
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
                                        loading && index === dataChat.length - 1
                                    }
                                    checkAI={false}
                                />
                            )
                        }
                    })}
                    {loading ? (
                        <MessageLeft loading={loading} checkAI={false} />
                    ) : null}
                    <div ref={messagesEndRef} />
                </Box>
                <TextInput
                    question={question}
                    setQuestion={setQuestion}
                    setLoading={setLoading}
                    dataChat={dataChat}
                    setDataChat={setDataChat}
                />
            </Paper>
        </>
        // </div>
    )
}
