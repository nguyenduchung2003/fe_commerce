"use client"
import { Formik, Form, ErrorMessage } from "formik"
import {
    Button,
    TextField,
    Box,
    Typography,
    InputAdornment,
    Divider,
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toastCustom } from "../Custom/CustomToast"
import { signIn } from "next-auth/react"
import LoginGG from "./LoginGG"
const Login = () => {
    const router = useRouter()

    const [checkEye, setCheckEye] = useState<boolean>(true)
    const initialValues: MyFormValues = {
        email: "",
        password: "",
    }

    return (
        <>
            <Box className=" w-full h-full  flex justify-center items-center relative top-[100px]">
                <Box className="w-[400px] h-[full] shadow-lg bg-white rounded-lg flex  flex-col gap-5 justify-center items-center p-2">
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
                                const res = await signIn("credentials", {
                                    redirect: false,
                                    email: values.email,
                                    password: values.password,
                                    callbackUrl: `http://localhost:3000/`,
                                })

                                if (res?.ok) {
                                    router.push("/", {
                                        scroll: false as unknown as boolean,
                                    })
                                } else {
                                    toastCustom(
                                        "error",
                                        "Email or password is incorrect"
                                    )
                                }
                            } catch (error) {
                                toastCustom(
                                    "error",
                                    "Email or password is incorrect"
                                )
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
                                    type={checkEye ? "password" : "text"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                position="start"
                                                onClick={() => {
                                                    setCheckEye(!checkEye)
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
                    <Divider
                        textAlign="center"
                        className="relative z-[100] text-black w-full"
                    >
                        Login with
                    </Divider>
                    <LoginGG />
                    <Box className="flex  justify-center items-center">
                        <Typography className="text-black">
                            Don't have an account?
                        </Typography>
                        <Link
                            href={"/register"}
                            className="hover:underline  no-underline text-black hover:text-red-600"
                        >
                            Create a new account
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Login
