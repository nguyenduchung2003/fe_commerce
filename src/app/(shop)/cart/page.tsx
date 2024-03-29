import CartComponent from "@/component/Cart/Cart"
import { getProductOrder } from "@/app/_api/users"
import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
const Cart = async () => {
     const cookieStore = cookies()
     const accessTokenCookies = cookieStore.get("AccessToken")?.value as string
     if (!cookieStore.has("AccessToken")) {
          return (
               <>
                    <Box className="flex justify-center items-center flex-col">
                         <Typography>
                              You need to login to view the cart
                         </Typography>
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
     const { id } = jwt.verify(
          accessTokenCookies,
          process.env.ACCESS_TOKEN_SECRET as string
     ) as JwtPayload

     const dataOrder: dataProductsOrder = await getProductOrder(id)

     return (
          <>
               <CartComponent
                    productsOrder={dataOrder.productsOrder}
                    idUserNow={id}
               />
          </>
     )
}
export default Cart
