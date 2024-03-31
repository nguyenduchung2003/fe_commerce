import RegisterComponent from "@/component/Register/Register"
import { signUp } from "@/app/_api/auth"
import Nav from "@/component/Navbar/Nav"
const Register = () => {
     return (
          <>
               {/* <Nav></Nav> */}
               <RegisterComponent signUp={signUp} />
          </>
     )
}
export default Register
