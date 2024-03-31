"use client"
import LoginComponent from "@/component/Login/Login"
import Nav from "@/component/Navbar/Nav"
import { signIn } from "next-auth/react"

const Login = () => {
     return (
          <>
               {/* <Nav></Nav> */}
               <LoginComponent signIn={signIn}></LoginComponent>
          </>
     )
}
export default Login
