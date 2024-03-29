import * as yup from "yup"
import axios from "axios"
const emailRegExp =
     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// const emailExistsInLocalStorage = async (value: string) => {
//      try {
//           const response = await axios.post(
//                "http://localhost:8080/auth/check_email",
//                {
//                     email: value,
//                },
//                {
//                     headers: {
//                          "Content-Type": "application/json",
//                     },
//                }
//           )
//           console.log(1)
//           const data = await response.status
//           if (data === 200) return true
//           return false
//      } catch (error) {
//           console.log(2)
//           console.log(error)
//      }
// }
export const useSchemasRegister = yup.object().shape({
     // checkEmail: yup.boolean(),
     // name: yup.string().required("Please enter a name"),
     email: yup
          .string()
          .matches(emailRegExp, "Email is not in correct format")
          .required("Please enter Email"),
     // .test("unique-email", "Email already exists", function (value) {
     //      return !emailExistsInLocalStorage(value)
     // }),

     password: yup
          .string()
          .min(6, "Password must have at least 6 characters")
          .required("Please enter a password"),

     passwordConfirm: yup
          .string()
          .oneOf([yup.ref("password")], "Password does not match")
          .required("Please enter a password confirm"),
})
