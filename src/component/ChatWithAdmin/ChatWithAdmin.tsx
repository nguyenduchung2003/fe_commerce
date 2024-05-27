"use client"

import { Button, Box, Typography, Tooltip } from "@mui/material"
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"
import AppChat from "./AppChat"
import { useEffect, useState } from "react"
import socket from "@/utils/socket"

import { getUserId } from "@/app/_lib/action"
import { getListChat } from "@/app/_api/allRolls"

const ChatWithAdmin = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [dataChat, setDataChat] = useState<message[]>([])

    return (
        <Box className="fixed z-[100] bottom-10 right-0 flex flex-col justify-center items-center gap-5">
            {open ? (
                <AppChat
                    setOpen={setOpen}
                    dataChat={dataChat}
                    setDataChat={setDataChat}
                />
            ) : (
                <>
                    <Tooltip
                        title="Chat with support staff"
                        placement="left"
                        arrow
                    >
                        <Button
                            onClick={async () => {
                                const userId = await getUserId()
                                const roomId = [3, userId].sort().join("-")
                                socket.emit("joinRoom", roomId)
                                const dataChat = await getListChat({
                                    senderId: userId as number,
                                    receiverId: 3,
                                })
                                setDataChat((prev) => dataChat.chat)
                                console.log(dataChat)

                                setOpen(true)
                            }}
                            className="w-[64px] h-[64px] bg-[rgb(62,115,199)] text-white hover:bg-[rgb(87,142,230)] flex items-center justify-center"
                        >
                            <SupervisorAccountIcon className="text-4xl" />
                        </Button>
                    </Tooltip>
                </>
            )}
        </Box>
    )
}

export default ChatWithAdmin
