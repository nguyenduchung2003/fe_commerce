import OrderHistoryComponent from "@/component/OrderHistory/OrderHistory"
import { getAllBills } from "@/app/_api/admin"
import { Box, Button, Typography } from "@mui/material"
import { checkAccessToken } from "@/app/_lib/action"
import Link from "next/link"
const OrderHistory = async () => {
    const check = await checkAccessToken()
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

    const dataBill = (await getAllBills()) as dataBillType
    return (
        <>
            <OrderHistoryComponent dataBill={dataBill} checkUser={false} />
        </>
    )
}
export default OrderHistory
