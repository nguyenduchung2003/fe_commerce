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

import { useSchemasRegister } from "../../validate/validate"
import { useRouter } from "next/navigation"
import { ToastContainer } from "react-toastify"
import { toastCustom } from "@/app/_lib/action"

const Register = ({ signUp }: any) => {
     const router = useRouter()
     const [checkEye, setCheckEye] = useState<boolean>(true)
     const [checkEyeConfirm, setCheckEyeConfirm] = useState<boolean>(true)
     const initialValues: MyFormValuesRegister = {
          email: "",
          password: "",
          passwordConfirm: "",
     }
     return (
          <>
               <Box className="bg-[#f0f2f5] w-full h-full  flex justify-center items-center relative top-[100px]">
                    <Box className="w-[430px] h-[570px]  shadow-lg bg-white rounded-lg flex  flex-col gap-5 justify-center items-center">
                         <Typography variant="h3" className="">
                              Register
                         </Typography>
                         <Formik
                              initialValues={initialValues}
                              validationSchema={useSchemasRegister}
                              onSubmit={async (values, actions) => {
                                   // actions.preventDefault();
                                   const account = {
                                        email: values.email,
                                        password: values.password,
                                   }

                                   try {
                                        const data = await signUp(account)
                                        console.log(data)
                                        if (data.error) {
                                             toastCustom(
                                                  "error",
                                                  "Email already exists"
                                             )
                                        } else {
                                             toastCustom(
                                                  "success",
                                                  "Register successfully",
                                                  () => {
                                                       router.push("/login")
                                                  }
                                             )
                                        }
                                   } catch (error) {
                                        console.log("Loi", error)
                                   }

                                   actions.setSubmitting(false)
                              }}
                         >
                              {(formikProps) => (
                                   <Form className="flex flex-col gap-[30px] justify-center items-center">
                                        <Box className=" relative">
                                             <TextField
                                                  variant="outlined"
                                                  label="Email"
                                                  className="h-[52px] w-[365px]"
                                                  name="email"
                                                  onChange={
                                                       formikProps.handleChange
                                                  }
                                                  onBlur={
                                                       formikProps.handleBlur
                                                  }
                                                  error={
                                                       formikProps.touched
                                                            .email &&
                                                       Boolean(
                                                            formikProps.errors
                                                                 .email
                                                       )
                                                  }
                                             ></TextField>
                                             <ErrorMessage name="email">
                                                  {(msg) => (
                                                       <Typography className="text-base text-red-600 absolute top-[54px]">
                                                            {msg}
                                                       </Typography>
                                                  )}
                                             </ErrorMessage>
                                        </Box>
                                        <Box className=" relative">
                                             <TextField
                                                  variant="outlined"
                                                  type={
                                                       checkEye
                                                            ? "password"
                                                            : "text"
                                                  }
                                                  label="Mật khẩu"
                                                  name="password"
                                                  onChange={
                                                       formikProps.handleChange
                                                  }
                                                  onBlur={
                                                       formikProps.handleBlur
                                                  }
                                                  error={
                                                       formikProps.touched
                                                            .password &&
                                                       Boolean(
                                                            formikProps.errors
                                                                 .password
                                                       )
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
                                                                      <VisibilityOffIcon />
                                                                 ) : (
                                                                      <VisibilityIcon />
                                                                 )}
                                                            </InputAdornment>
                                                       ),
                                                  }}
                                                  className="h-[52px] w-[365px]"
                                             ></TextField>
                                             <ErrorMessage name="password">
                                                  {(msg) => (
                                                       <Typography className="text-base text-red-600 absolute top-[54px]">
                                                            {msg}
                                                       </Typography>
                                                  )}
                                             </ErrorMessage>
                                        </Box>
                                        <Box className=" relative">
                                             <TextField
                                                  type={
                                                       checkEyeConfirm
                                                            ? "password"
                                                            : "text"
                                                  }
                                                  variant="outlined"
                                                  label="Nhập lại mật khẩu"
                                                  name="passwordConfirm"
                                                  onChange={
                                                       formikProps.handleChange
                                                  }
                                                  onBlur={
                                                       formikProps.handleBlur
                                                  }
                                                  error={
                                                       formikProps.touched
                                                            .passwordConfirm &&
                                                       Boolean(
                                                            formikProps.errors
                                                                 .passwordConfirm
                                                       )
                                                  }
                                                  InputProps={{
                                                       endAdornment: (
                                                            <InputAdornment
                                                                 position="start"
                                                                 onClick={() => {
                                                                      setCheckEyeConfirm(
                                                                           !checkEyeConfirm
                                                                      )
                                                                 }}
                                                            >
                                                                 {checkEyeConfirm ? (
                                                                      <VisibilityOffIcon />
                                                                 ) : (
                                                                      <VisibilityIcon />
                                                                 )}
                                                            </InputAdornment>
                                                       ),
                                                  }}
                                                  className="h-[52px] w-[365px]"
                                             ></TextField>
                                             <ErrorMessage name="passwordConfirm">
                                                  {(msg) => (
                                                       <Typography className="text-base text-red-600 absolute top-[54px]">
                                                            {msg}
                                                       </Typography>
                                                  )}
                                             </ErrorMessage>
                                        </Box>

                                        <Button
                                             type="submit"
                                             variant="contained"
                                             className="h-[52px] w-[365px] normal-case text-2xl"
                                        >
                                             Đăng kí
                                        </Button>
                                   </Form>
                              )}
                         </Formik>

                         <Link
                              href={"/login"}
                              className="hover:bg-[#469436] hover:scale-90 h-[52px] w-[180px] bg-[#42b72a] rounded-lg flex text-white justify-center items-center no-underline "
                         >
                              Đăng nhập
                         </Link>
                    </Box>
               </Box>
               <ToastContainer />
          </>
     )
}
export default Register
