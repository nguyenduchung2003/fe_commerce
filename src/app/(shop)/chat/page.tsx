import Chat from "@/component/Chat/Chat"
import type { Metadata } from "next"
import { getListCustomChat } from "@/app/_api/admin"
export const metadata: Metadata = {
    title: "Chat",
    description: "Chat page",
}

const Cart = async () => {
    const listFriend = await getListCustomChat()

    return (
        <>
            <Chat listFriend={listFriend.result || []} />
        </>
    )
}
export default Cart
