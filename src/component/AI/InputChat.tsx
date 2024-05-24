"use client"
import { Button, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { FormEvent, useState } from "react"
import { askAI } from "@/app/_api/allRolls"
interface AIProps {
    question: string
    setQuestion: React.Dispatch<React.SetStateAction<string>>
    setMessage: React.Dispatch<
        React.SetStateAction<
            {
                role: string
                message: string
            }[]
        >
    >
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const AI = ({ question, setQuestion, setMessage, setLoading }: AIProps) => {
    const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const questions = {
            role: "user",
            message: question,
        }
        setMessage((prev) => [...prev, questions])
        setQuestion("")
        setLoading(true)
        const response = await askAI(question)
        const answers = {
            role: "model",
            message: response.text,
        }
        setMessage((prev) => [...prev, answers])
        setLoading(false)
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

export default AI
