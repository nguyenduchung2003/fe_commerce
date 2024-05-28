"use client"
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
    Divider,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { use, useEffect, useRef, useState } from "react"

import { useSession } from "next-auth/react"
import socket from "@/utils/socket"
import { getListChat } from "@/app/_api/allRolls"

type messages = {
    createdAt: string
    message: string
    receiverId: number
    senderId: number
    roomId?: string
}
const ChatUI = ({ listFriend }: { listFriend: { email: string }[] }) => {
    const [input, setInput] = useState("")
    const [messagesBox, setMessages] = useState<messages[]>([])
    const [chatNowFrinedId, setChatNowFrinedId] = useState<string>("")
    const [selectedButton, setSelectedButton] = useState<number | null>(null)
    const session = useSession()
    const userId: number = 3

    useEffect(() => {
        const roomId = [chatNowFrinedId, userId].sort().join("-")
        const handleUserChat = (data: any) => {
            setMessages((prev) => [...prev, data])
        }

        socket.on(roomId, handleUserChat)

        return () => {
            socket.off(roomId, handleUserChat)
        }
    }, [chatNowFrinedId, userId])

    const handleInputChange = (event: any) => {
        setInput(event.target.value)
    }

    const messagesContainerRef = useRef<HTMLDivElement>(null)
    const limitPage = useRef(1)
    const [friendId, setFriendId] = useState<number | undefined>(undefined)

    const handlerGetFriendId = async (friend: any, index: any) => {
        const roomId = [friend.id, userId].sort().join("-")

        // socket.emit("leaveRoom" , roomId)
        socket.emit("joinRoom", roomId)
        const listChats = await getListChat({
            senderId: userId as number,
            receiverId: friend.id,
            page: 1,
            pageSize: 13,
        })
        setFriendId(friend.id)
        setMessages(listChats.chat)
        setChatNowFrinedId(friend.id)
        setSelectedButton(index)
    }
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    //     const { scrollTop, scrollHeight, clientHeight } =
    //         e.target as HTMLDivElement
    //     if (scrollTop === 0) {
    //         limitMessage.current += 13
    //         getListChat({
    //             senderId: userId as number,
    //             receiverId: friendId!,
    //             pageSize: limitMessage.current,
    //         }).then((res) => {
    //             if (res.chat.length === 0) return
    //             setMessages((prev) => [...res.chat])
    //         })
    //     }

    // }
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } =
            e.target as HTMLDivElement
        if (scrollTop === 0 && !isLoading && hasMore) {
            setIsLoading(true)
            limitPage.current += 1
            getListChat({
                senderId: userId as number,
                receiverId: friendId!,
                page: limitPage.current,
                pageSize: 13,
            }).then((res) => {
                if (res.chat.length === 0) {
                    setHasMore(false)
                    return
                }
                setMessages((prev) => [...res.chat])
                setIsLoading(false)
            })
        }
    }
    const handleSend = (e: any) => {
        e.preventDefault()
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight
        }
        if (selectedButton == null) {
            return alert("Please select friend")
        } else if (input == "") {
            return alert("Please type message")
        }

        if (input.trim() !== "") {
            const roomId = [chatNowFrinedId, userId].sort().join("-")

            socket.emit("on-chat", {
                message: input,
                receiverId: chatNowFrinedId,
                senderId: userId,
                roomId: roomId,
            })
            setInput("")
        }
    }

    return (
        <Box className=" flex  ">
            <Box className="p-[10px]">
                <Typography variant="h4">Chat</Typography>
                {listFriend?.length == 0 ? (
                    <Typography variant="h5">No custom</Typography>
                ) : (
                    <Box className="flex flex-col gap-5">
                        {listFriend.map((friend: any, index: number) => {
                            return (
                                <Button
                                    key={index}
                                    className={`normal-case w-full h-[50px] border border-solid border-gray-300 ${
                                        selectedButton === index
                                            ? "bg-gray-300"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handlerGetFriendId(friend, index)
                                    }
                                >
                                    <Typography>{friend.email}</Typography>
                                </Button>
                            )
                        })}
                    </Box>
                )}
            </Box>
            <Divider orientation="vertical" flexItem />
            <form onSubmit={handleSend} className="w-full">
                <Box className="h-screen flex flex-col">
                    <Box
                        sx={{ flexGrow: 1, overflow: "auto", p: 2 }}
                        ref={messagesContainerRef}
                        onScroll={handleScroll}
                        className=""
                    >
                        {messagesBox
                            // ?.filter(
                            //     (mess) =>
                            //         mess.roomId ===
                            //         [chatNowFrinedId, userId].sort().join("-")
                            // )
                            .map((message, index) => {
                                return (
                                    <Message
                                        key={index}
                                        message={message}
                                        userId={userId}
                                    />
                                )
                            })}
                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={2} className="relative">
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    placeholder="Type a message "
                                    value={input}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    className="h-[100%]"
                                    type="submit"
                                    fullWidth
                                    size="large"
                                    color="primary"
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

const Message = ({
    message,
    userId,
}: {
    message: messages
    userId: number
}) => {
    const isBot = message.senderId !== userId

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: isBot ? "flex-start" : "flex-end",
                mb: 2,
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    p: 1,
                    backgroundColor: isBot
                        ? "primary.light"
                        : "secondary.light",
                    maxWidth: 600,
                    wordWrap: "break-word",
                }}
            >
                <Typography>{message.message}</Typography>
            </Paper>
        </Box>
    )
}

export default ChatUI
