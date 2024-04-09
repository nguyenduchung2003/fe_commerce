import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import React from "react"
import { useState } from "react"
import AddProduct from "@/component/AddProduct/AddProduct"
import { Box } from "@mui/material"
export default function ModalAddProduct({
    openModalAdd,
    setOpenModalAdd,
    dataGetAllCategories,
    addProduct,
}: {
    dataGetAllCategories: dataGetAllCategoriesType[]
    openModalAdd: boolean
    setOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>
    addProduct: (product: products) => Promise<any>
}) {
    const handleClose = () => {
        setOpenModalAdd(false)
    }

    return (
        <React.Fragment>
            <Dialog
                open={openModalAdd}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogActions>
                    <Button onClick={handleClose} className="w-0 h-0">
                        x
                    </Button>
                </DialogActions>

                <DialogTitle>Add Product</DialogTitle>

                <Box className="mt-[0px] ">
                    <AddProduct
                        dataGetAllCategories={dataGetAllCategories}
                        addProduct={addProduct}
                        setOpenModalAdd={setOpenModalAdd}
                    />
                </Box>
            </Dialog>
        </React.Fragment>
    )
}
