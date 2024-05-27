import LoginComponent from "@/component/Login/Login"
import type { Metadata } from "next"
export const metadata: Metadata = {
    title: "Login",
    description: "Login page",
}
const Login = async () => {
    return (
        <>
            <LoginComponent></LoginComponent>
        </>
    )
}
export default Login
