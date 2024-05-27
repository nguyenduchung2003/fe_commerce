"use client"
import { Box, Button, Typography } from "@mui/material"
import { useSession, signIn, signOut } from "next-auth/react"
const LoginGG = () => {
    return (
        <>
            <Box className=" flex flex-col justify-between items-center ">
                <Button
                    onClick={() =>
                        signIn("google", {
                            callbackUrl: "http://localhost:3000",
                        })
                    }
                    className="border border-solid h-[40px]"
                >
                    Sign in with google
                </Button>
            </Box>
        </>
    )
}
export default LoginGG
