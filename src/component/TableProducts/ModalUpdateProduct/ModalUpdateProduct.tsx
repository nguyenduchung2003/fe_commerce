import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import React from "react"
import { useState } from "react"
import AddProduct from "@/component/AddProduct/AddProduct"
import { Box } from "@mui/material"
export default function ModalUpdateProduct({
     openModal,
     setOpenModal,
     dataGetAllCategories,
     productDetail,
     updateProduct,
}: {
     productDetail: products
     dataGetAllCategories: dataGetAllCategoriesType[]
     openModal: boolean
     setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
     updateProduct: (product: products) => Promise<any>
}) {
     const [productUpdate, setProductUpdate] = useState()
     const handleClose = () => {
          setOpenModal(false)
     }
     const handleAgreeUpdate = () => {
          setOpenModal(false)
     }
     // console.log(dataGetAllCategories)
     return (
          <React.Fragment>
               <Dialog
                    open={openModal}
                    onClose={handleClose}
                    maxWidth="lg"
                    fullWidth
               >
                    <DialogActions>
                         <Button onClick={handleClose} className="w-0 h-0">
                              x
                         </Button>
                    </DialogActions>

                    <DialogTitle>Update Product</DialogTitle>

                    <Box className="mt-[0px] ">
                         <AddProduct
                              dataGetAllCategories={dataGetAllCategories}
                              productDetail={productDetail}
                              updateProduct={updateProduct}
                              setOpenModal={setOpenModal}
                         />
                    </Box>
               </Dialog>
          </React.Fragment>
     )
}
