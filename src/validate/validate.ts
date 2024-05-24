import * as yup from "yup"

const emailRegExp =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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
