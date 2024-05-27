import RegisterComponent from "@/component/Register/Register"
import { signUp } from "@/app/_api/auth"

import type { Metadata } from "next"
export const metadata: Metadata = {
    title: "Register",
    description: "Register page",
}
const Register = async () => {
    return (
        <>
            {/* <Nav></Nav> */}
            <RegisterComponent signUp={signUp} />
        </>
    )
}
export default Register
