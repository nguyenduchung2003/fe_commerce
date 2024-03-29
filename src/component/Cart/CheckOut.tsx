import {
     Box,
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableRow,
     TextField,
     Typography,
} from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"

import DialogTitle from "@mui/material/DialogTitle"
import React from "react"

import Image from "next/image"
import { payToCart } from "@/app/_api/users"
interface CheckOutProps {
     open: boolean
     setOpen: (value: React.SetStateAction<boolean>) => void
     productsCheckOut: productsOrder[]
     nameUser: string
     setNameUser: (value: React.SetStateAction<string>) => void
     phoneUser: string
     setPhoneUser: (value: React.SetStateAction<string>) => void
     addressUser: string
     setAddressUser: (value: React.SetStateAction<string>) => void
     idUserNow: number
}

const CheckOut = ({
     open,
     setOpen,
     productsCheckOut,
     nameUser,
     setNameUser,
     phoneUser,
     setPhoneUser,
     addressUser,
     setAddressUser,
     idUserNow,
}: CheckOutProps) => {
     const price = productsCheckOut?.reduce((acc, prev) => {
          acc += prev.quantity_order * (prev.price as unknown as number)
          return acc
     }, 0)

     const handleClose = () => {
          setOpen(false)
     }
     const handlerPlaceOrder = async () => {
          const dataPayToCart = {
               userId: idUserNow,
               date: new Date().toISOString(),
               status: 0,
               totalAmount: price,
               numberPhone: phoneUser,
               address: addressUser,
               orderIds: productsCheckOut.map((product) => product.orderID),
               name: nameUser,
          }
          console.log("dataPayToCart", dataPayToCart)
          await payToCart(dataPayToCart)
          setOpen(false)
     }

     return (
          <React.Fragment>
               <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth
               >
                    <Box className="flex justify-between">
                         <DialogTitle>Payment information</DialogTitle>
                         <Button onClick={handleClose} className="text-black">
                              x
                         </Button>
                    </Box>
                    <Box className="flex flex-col gap-5 w-[50%] relative left-[200px] !text-left">
                         <TextField
                              required
                              label="Name"
                              variant="outlined"
                              value={nameUser}
                              onChange={(e) => setNameUser(e.target.value)}
                         ></TextField>
                         <TextField
                              required
                              type="number"
                              label="Number phone"
                              variant="outlined"
                              value={phoneUser}
                              onChange={(e) => setPhoneUser(e.target.value)}
                              inputProps={{ style: { textAlign: "left" } }}
                         ></TextField>
                         <TextField
                              required
                              label="Address"
                              variant="outlined"
                              value={addressUser}
                              onChange={(e) => setAddressUser(e.target.value)}
                         ></TextField>
                    </Box>

                    <DialogTitle>Products Ordered</DialogTitle>

                    <Table>
                         <TableHead>
                              <TableRow>
                                   <TableCell className="w-[10px]"></TableCell>
                                   <TableCell>Product</TableCell>
                                   <TableCell>Unit Price</TableCell>
                                   <TableCell
                                        align="center"
                                        className="w-[200px]"
                                   >
                                        Quantity
                                   </TableCell>
                                   <TableCell align="right">
                                        Total Price
                                   </TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {productsCheckOut?.map((product, index) => (
                                   <TableRow key={index}>
                                        <TableCell className="w-[10px]"></TableCell>
                                        <TableCell className="flex items-center gap-3">
                                             <Box>
                                                  <Image
                                                       src={product?.image[0]}
                                                       width={160}
                                                       height={80}
                                                       alt={""}
                                                       key={index}
                                                       className="object-cover"
                                                       priority={true}
                                                  />
                                             </Box>
                                             <Box>{product.nameProduct}</Box>

                                             <Box className="flex items-center gap-2">
                                                  Variants:
                                                  {product.variants.map(
                                                       (variant, index) => (
                                                            <Typography
                                                                 key={index}
                                                            >
                                                                 {variant.value}
                                                                 {index ===
                                                                 product
                                                                      .variants
                                                                      .length -
                                                                      1
                                                                      ? "."
                                                                      : ","}
                                                            </Typography>
                                                       )
                                                  )}
                                             </Box>
                                        </TableCell>

                                        <TableCell>{product.price}$</TableCell>
                                        <TableCell align="center">
                                             {product.quantity_order}
                                        </TableCell>
                                        <TableCell align="right">
                                             {(product.price as unknown as number) *
                                                  product.quantity_order}
                                             $
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
                    <Box className="flex items-center justify-around my-10">
                         <Box className="flex items-center gap-[100px]">
                              <Typography>
                                   Total
                                   {`( ${productsCheckOut.length} products)`}:
                                   {price}$
                              </Typography>
                              <Button
                                   className="  border border-solid rounded w-[200px] h-[45px] bg-orange-600 text-white hover:bg-orange-400"
                                   onClick={handlerPlaceOrder}
                                   disabled={
                                        nameUser && phoneUser && addressUser
                                             ? false
                                             : true
                                   }
                              >
                                   Place Order
                              </Button>
                         </Box>
                    </Box>
               </Dialog>
          </React.Fragment>
     )
}
export default CheckOut
