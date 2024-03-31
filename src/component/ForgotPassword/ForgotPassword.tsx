"use client"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { forgotPassword } from "@/app/_api/auth"
import { ToastContainer } from "react-toastify"
import { toastCustom } from "@/app/_lib/action"
import { useRouter } from "next/navigation"
const ForgotPassword = () => {
     const router = useRouter()
     const [email, setEmail] = useState<string>("")
     const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
     }
     const handleSubmit = async () => {
          const res = await forgotPassword(email)
          if (res.status == "error") {
               toastCustom("error", "Email is not registered")
          } else {
               toastCustom(
                    "success",
                    "New password has been sent to your email"
               )

               setEmail("")
          }
     }
     return (
          <>
               <ToastContainer />
               <Box className=" w-full h-full  flex justify-center items-center relative top-[100px]">
                    <Box className="w-[400px] h-[400px] shadow-lg bg-white rounded-lg flex  flex-col gap-[50px] justify-center items-center ">
                         <Typography variant="h3" className="">
                              Forgot Password
                         </Typography>

                         <Box
                              onSubmit={handleSubmit}
                              className="flex flex-col gap-[50px] justify-center items-center "
                         >
                              <TextField
                                   id="email"
                                   label="Email"
                                   variant="outlined"
                                   value={email}
                                   onChange={handleChangeEmail}
                                   className="w-[300px]"
                              />
                              <Box className="flex flex-col gap-5 justify-center items-center">
                                   <Button
                                        onClick={handleSubmit}
                                        variant="contained"
                                        color="primary"
                                        className="h-[50px] w-[200px]"
                                   >
                                        Send
                                   </Button>
                                   <Button
                                        onClick={() => router.push("/login")}
                                        variant="contained"
                                        color="info"
                                        className="h-[40px] w-[150px]"
                                   >
                                        Login
                                   </Button>
                              </Box>
                         </Box>
                    </Box>
               </Box>
          </>
     )
}
export default ForgotPassword
