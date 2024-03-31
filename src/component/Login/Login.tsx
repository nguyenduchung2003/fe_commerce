"use client"
import { Formik, Form, ErrorMessage } from "formik"
import {
     Button,
     TextField,
     Box,
     Typography,
     InputAdornment,
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Login = ({ signIn }: { signIn: any }) => {
     const router = useRouter()

     const [checkEye, setCheckEye] = useState<boolean>(true)
     const initialValues: MyFormValues = {
          email: "",
          password: "",
     }
     const clickLoginGG = () => {
          signIn("google", { callbackUrl: `http://localhost:3000/` })
     }
     return (
          <>
               <Box className=" w-full h-full  flex justify-center items-center relative top-[100px]">
                    <Box className="w-[400px] h-[400px] shadow-lg bg-white rounded-lg flex  flex-col gap-5 justify-center items-center p-2">
                         <Typography variant="h3" className="">
                              Login
                         </Typography>
                         <Formik
                              initialValues={initialValues}
                              onSubmit={async (values, actions) => {
                                   const account = {
                                        email: values.email,
                                        password: values.password,
                                   }
                                   try {
                                        const res = await signIn(
                                             "credentials",
                                             {
                                                  redirect: false,
                                                  email: values.email,
                                                  password: values.password,
                                                  callbackUrl: `http://localhost:3000/`,
                                             }
                                        )

                                        if (res.ok) {
                                             router.push("/", {
                                                  scroll: false as unknown as boolean,
                                             })
                                        } else {
                                             alert(
                                                  "Email or password is incorrect"
                                             )
                                        }
                                   } catch (error) {
                                        alert("Email or password is incorrect")
                                   }
                              }}
                         >
                              {(props) => (
                                   <Form className="flex flex-col gap-5  justify-center items-center w-full h-full">
                                        <TextField
                                             variant="outlined"
                                             label="Email"
                                             className="h-[52px] w-[365px]"
                                             onChange={props.handleChange}
                                             onBlur={props.handleBlur}
                                             name="email"
                                        ></TextField>

                                        <TextField
                                             variant="outlined"
                                             label="Mật khẩu"
                                             name="password"
                                             onChange={props.handleChange}
                                             onBlur={props.handleBlur}
                                             type={
                                                  checkEye ? "password" : "text"
                                             }
                                             InputProps={{
                                                  endAdornment: (
                                                       <InputAdornment
                                                            position="start"
                                                            onClick={() => {
                                                                 setCheckEye(
                                                                      !checkEye
                                                                 )
                                                            }}
                                                       >
                                                            {checkEye ? (
                                                                 <VisibilityIcon />
                                                            ) : (
                                                                 <VisibilityOffIcon />
                                                            )}
                                                       </InputAdornment>
                                                  ),
                                             }}
                                             className="h-[52px] w-[365px]"
                                        ></TextField>
                                        <Link
                                             href={"/forgotpassword"}
                                             className="text-black no-underline relative left-[115px]"
                                        >
                                             Forgot password
                                        </Link>
                                        <Button
                                             type="submit"
                                             variant="contained"
                                             className="h-[52px] w-[365px] normal-case text-2xl"
                                        >
                                             Login
                                        </Button>
                                        {/* <Divider variant="inset" /> */}
                                   </Form>
                              )}
                         </Formik>
                         <Button onClick={clickLoginGG}>
                              Login with google
                         </Button>

                         <Link
                              href={"/register"}
                              className="hover:bg-[#469436] h-[60px] p-1 w-[180px] bg-[#42b72a] rounded-lg flex text-white justify-center items-center no-underline "
                         >
                              Create a new account
                         </Link>
                    </Box>
               </Box>
          </>
     )
}
export default Login
