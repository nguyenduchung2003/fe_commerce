import { toast, TypeOptions } from "react-toastify"

export function toastCustom(
    type: TypeOptions | null | undefined,
    message: string,
    options?: (<T = {}>(props: T) => void) | null | undefined
) {
    return toast.update(toast.loading("Loading..."), {
        render: message,
        type: type,
        position: "top-right",
        isLoading: false,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        onClose: options,
    })
}
