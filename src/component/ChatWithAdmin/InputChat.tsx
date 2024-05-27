"use client"
import { Button, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { FormEvent, useState } from "react"
import { askAI } from "@/app/_api/allRolls"
import { useCookies } from "next-client-cookies"
import socket from "@/utils/socket"
import { getUserId } from "@/app/_lib/action"
interface ChatProps {
    question: string
    setQuestion: React.Dispatch<React.SetStateAction<string>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    dataChat: message[]
    setDataChat: React.Dispatch<React.SetStateAction<message[]>>
}
const InputChat = ({
    question,
    setQuestion,
    setLoading,
    dataChat,
    setDataChat,
}: ChatProps) => {
    const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (question == "") {
            return alert("Please type message")
        }
        if (question.trim() !== "") {
            const userId = (await getUserId()) as number
            const roomId = [3, userId].sort().join("-")
            socket.emit("on-chat", {
                message: question,
                receiverId: 3,
                senderId: userId,
                roomId: roomId,
            })
            // setDataChat((prev) => [
            //     ...prev,
            //     {
            //         message: question,
            //         receiverID: 3,
            //         senderID: userId,
            //     },
            // ])
            setQuestion("")
        }
    }
    return (
        <>
            <form
                className="flex justify-center w-[95%] gap-2 items-center m-2"
                noValidate
                autoComplete="off"
                onSubmit={handlerSubmit}
            >
                <TextField
                    label="Question...."
                    className="w-full "
                    value={question}
                    InputProps={{
                        style: {
                            height: "45px",
                            textAlign: "center",
                        },
                    }}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="h-[45px]"
                >
                    <SendIcon />
                </Button>
            </form>
        </>
    )
}

export default InputChat
