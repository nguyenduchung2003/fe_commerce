"use server"

import { deleteProduct, updateProduct, addProduct2 } from "@/app/_api/admin"
import { getAllProducts, getAllCategories } from "@/app/_api/allRolls"
import TableProducts from "@/component/TableProducts/TableProducts"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import { checkAccessToken, getUserId } from "@/app/_lib/action"
const productManagement = async () => {
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
    const dataAllProducts: arrayProducts = await getAllProducts()
    const dataGetAllCategories: dataGetAllCategoriesType[] =
        await getAllCategories()
    return (
        <>
            <TableProducts
                data={dataAllProducts}
                deleteProduct={deleteProduct}
                dataGetAllCategories={dataGetAllCategories}
                updateProduct={updateProduct}
                addProduct={addProduct2}
            />
        </>
    )
}

export default productManagement
