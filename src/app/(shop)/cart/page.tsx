import CartComponent from "@/component/Cart/Cart"
import { getProductOrder } from "@/app/_api/users"
import { Box, Button, Typography } from "@mui/material"
import { checkAccessToken, getUserId } from "@/app/_lib/action"
import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = {
    title: "Cart",
    description: "Cart page",
}

const Cart = async () => {
    const check = await checkAccessToken()
    const id = await getUserId()
    if (!check) {
        return (
            <>
                <Box className="flex justify-center items-center flex-col">
                    <Typography>You need to login to view the cart</Typography>
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

    const dataOrder: dataProductsOrder = await getProductOrder(id!)

    return (
        <>
            <CartComponent
                productsOrder={dataOrder.productsOrder}
                idUserNow={id!}
            />
        </>
    )
}
export default Cart
