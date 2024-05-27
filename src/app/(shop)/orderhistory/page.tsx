import OrderHistoryComponent from "@/component/OrderHistory/OrderHistory"
import { getBill } from "@/app/_api/users"
import { Box, Button, Typography } from "@mui/material"
import { checkAccessToken, getUserId } from "@/app/_lib/action"
import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = {
    title: "Order History",
    description: "Order History page",
}
const OrderHistory = async () => {
    const check = await checkAccessToken()
    const id = await getUserId()

    if (!check) {
        return (
            <>
                <Box className="flex justify-center items-center flex-col">
                    <Typography>You need to login</Typography>
                    <Button>
                        <Link
                            href="/login"
                            className="flex justify-center items-center flex-col no-underline border border-solid rounded w-[200px] h-[45px] bg-orange-600 text-white hover:bg-orange-400"
                        >
                            Login
                        </Link>
                    </Button>
                </Box>
            </>
        )
    }

    const dataBill = (await getBill(id!)) as dataBillType
    return (
        <>
            <OrderHistoryComponent dataBill={dataBill} checkUser={true} />
        </>
    )
}
export default OrderHistory
