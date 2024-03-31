"use client"
import {
     Box,
     Button,
     Input,
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableRow,
     Checkbox,
     Typography,
} from "@mui/material"

import Image from "next/image"
import {
     updateProductToCart,
     deleteProductToCart,
     deleteMultipleProductsInCart,
} from "@/app/_api/users"
import { useEffect, useState } from "react"
import CheckOut from "./CheckOut"
import cartEmty from "../../../public/Cart.png"
import { useRouter } from "next/navigation"
const Cart = ({
     productsOrder,
     idUserNow,
}: {
     productsOrder: productsOrder[]
     idUserNow: number
}) => {
     const router = useRouter()
     const [nameUser, setNameUser] = useState<string>("")
     const [phoneUser, setPhoneUser] = useState<string>("")
     const [addressUser, setAddressUser] = useState<string>("")

     const [checkItems, setCheckItems] = useState<boolean[]>(
          productsOrder ? productsOrder.map((product) => false) : []
     )
     const [checkAllItem, setCheckAllItem] = useState<boolean>(false)
     const [totalPrice, setTotalPrice] = useState<number>(0)
     useEffect(() => {
          setCheckItems(productsOrder?.map((product) => false) || [])
     }, [productsOrder])
     useEffect(() => {
          if (checkItems.every((item) => item == true)) {
               setCheckAllItem(true)
          } else {
               setCheckAllItem(false)
          }
          const sumProductCheck = productsOrder
               ?.map((productOrder, index) => {
                    if (checkItems[index]) {
                         return (
                              (productOrder.price as unknown as number) *
                              productOrder.quantity_order
                         )
                    }
               })
               .filter((item) => item) as number[]

          const sumPrice = sumProductCheck?.reduce(
               (acc: number, next: number) => {
                    acc += next
                    return acc
               },
               0
          ) as number
          setTotalPrice(sumPrice)
     }, [checkItems, productsOrder])
     const [open, setOpen] = useState<boolean>(false)
     const [productsCheckOut, setProductsCheckOut] = useState<productsOrder[]>(
          []
     )
     useEffect(() => {
          const dataCheckOut = checkItems.reduce(
               (acc: productsOrder[], checkItem, index) => {
                    if (checkItem) {
                         acc.push(productsOrder[index])
                    }
                    return acc
               },
               []
          )
          setProductsCheckOut(dataCheckOut)
     }, [checkItems, productsOrder])

     const handlerCheckOut = () => {
          setOpen(true)
     }
     const handleIncreaseQuantity = async (id: number) => {
          const data = {
               orderID: id,
               type: "increase",
          }
          await updateProductToCart(data)
     }
     const handleDecreaseQuantity = async (id: number) => {
          const data = {
               orderID: id,
               type: "decrease",
          }
          await updateProductToCart(data)
     }
     const handlerDeleteItem = async (orderID: number, indexCheck: number) => {
          setCheckItems((prevItemCheck) => {
               const newItemCheck = [...prevItemCheck]
               const resultsCheck = newItemCheck.filter(
                    (itemCheck, index) => index != indexCheck
               )

               return resultsCheck
          })
          await deleteProductToCart(orderID)
     }
     const handlerClickDeleteAll = async () => {
          const orderIdCheck = productsOrder
               .map((productOrder, index) => {
                    if (checkItems[index]) {
                         return productOrder.orderID
                    }
               })
               .filter((item) => item) as number[]

          setCheckItems((checkItem) => {
               const newCheckItem = checkItem.filter((check) => !check)

               return newCheckItem
          })
          await deleteMultipleProductsInCart({ orderID: orderIdCheck })
     }

     if (!productsOrder || productsOrder.length === 0) {
          return (
               <>
                    <Box className="flex justify-center items-center flex-col">
                         <Image
                              src={cartEmty}
                              alt="Picture of the author"
                              width={200}
                              height={200}
                              priority={true}
                         />
                         <Typography>Your shopping cart is empty</Typography>
                         <Button
                              onClick={() => router.push("/")}
                              className="border border-solid rounded w-[200px] h-[45px] bg-orange-600 text-white hover:bg-orange-400"
                         >
                              Go shopping now
                         </Button>
                    </Box>
               </>
          )
     } else {
          return (
               <>
                    <CheckOut
                         open={open}
                         setOpen={setOpen}
                         productsCheckOut={productsCheckOut}
                         nameUser={nameUser}
                         setNameUser={setNameUser}
                         phoneUser={phoneUser}
                         setPhoneUser={setPhoneUser}
                         addressUser={addressUser}
                         setAddressUser={setAddressUser}
                         idUserNow={idUserNow}
                    ></CheckOut>
                    <Box>
                         <Table>
                              <TableHead>
                                   <TableRow>
                                        <TableCell className="w-[10px]">
                                             <Checkbox
                                                  checked={checkAllItem}
                                                  onChange={() => {
                                                       setCheckAllItem(
                                                            !checkAllItem
                                                       )
                                                       setCheckItems(
                                                            productsOrder.map(
                                                                 () =>
                                                                      !checkAllItem
                                                            )
                                                       )
                                                  }}
                                             ></Checkbox>
                                        </TableCell>
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
                                        <TableCell align="right">
                                             Action
                                        </TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {productsOrder?.map((product, index) => (
                                        <TableRow key={index}>
                                             <TableCell className="w-[10px]">
                                                  <Checkbox
                                                       key={index}
                                                       checked={
                                                            checkItems[index]
                                                       }
                                                       onChange={() => {
                                                            setCheckItems(
                                                                 (
                                                                      prevCheckItems
                                                                 ) => {
                                                                      const newCheckItems =
                                                                           [
                                                                                ...prevCheckItems,
                                                                           ]
                                                                      newCheckItems[
                                                                           index
                                                                      ] =
                                                                           !newCheckItems[
                                                                                index
                                                                           ]
                                                                      return newCheckItems
                                                                 }
                                                            )
                                                       }}
                                                  ></Checkbox>
                                             </TableCell>
                                             <TableCell className="flex items-center gap-3">
                                                  <Box>
                                                       <Image
                                                            src={
                                                                 product
                                                                      ?.image[0]
                                                            }
                                                            width={160}
                                                            height={80}
                                                            alt={""}
                                                            key={index}
                                                            className="object-cover"
                                                            priority={true}
                                                       />
                                                  </Box>
                                                  <Box>
                                                       {product.nameProduct}
                                                  </Box>

                                                  <Box className="flex items-center gap-2">
                                                       Variants:
                                                       {product.variants.map(
                                                            (
                                                                 variant,
                                                                 index
                                                            ) => (
                                                                 <Typography
                                                                      key={
                                                                           index
                                                                      }
                                                                 >
                                                                      {
                                                                           variant.value
                                                                      }
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

                                             <TableCell>
                                                  {product.price}$
                                             </TableCell>
                                             <TableCell>
                                                  <Box className="flex items-center border border-solid w-[200px] justify-between">
                                                       <Button
                                                            onClick={() => {
                                                                 if (
                                                                      product.quantity_order >
                                                                      0
                                                                 ) {
                                                                      handleDecreaseQuantity(
                                                                           product.orderID
                                                                      )
                                                                 } else {
                                                                      return
                                                                 }
                                                            }}
                                                       >
                                                            -
                                                       </Button>

                                                       <Input
                                                            readOnly
                                                            type="number"
                                                            // value={quantity[index]}
                                                            // onChange={(e) =>
                                                            //      handlerChangeQuantity(
                                                            //           e,
                                                            //           index
                                                            //      )
                                                            // }
                                                            value={
                                                                 product.quantity_order
                                                            }
                                                            className=" border-x border-y-0 border-solid  h-[37px] text-center "
                                                       />

                                                       <Button
                                                            onClick={() => {
                                                                 if (
                                                                      product.quantity_order <
                                                                      product.quantityMax
                                                                 ) {
                                                                      handleIncreaseQuantity(
                                                                           product.orderID
                                                                      )
                                                                 } else {
                                                                      alert(
                                                                           `There are only ${product.quantityMax} quantity remaining for this item`
                                                                      )
                                                                 }
                                                            }}
                                                       >
                                                            +
                                                       </Button>
                                                  </Box>
                                             </TableCell>
                                             <TableCell align="right">
                                                  {(product.price as unknown as number) *
                                                       product.quantity_order}
                                                  $
                                             </TableCell>
                                             <TableCell align="right">
                                                  <Button
                                                       className="hover:text-red-600"
                                                       onClick={() =>
                                                            handlerDeleteItem(
                                                                 product.orderID,
                                                                 index
                                                            )
                                                       }
                                                  >
                                                       Delete
                                                  </Button>
                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>

                         <Box className="flex items-center justify-around mt-10">
                              <Box className="flex items-center gap-[100px]">
                                   <Box className="flex items-center">
                                        <Checkbox
                                             checked={checkAllItem}
                                             onChange={() => {
                                                  setCheckAllItem(!checkAllItem)
                                                  setCheckItems(
                                                       productsOrder.map(
                                                            () => !checkAllItem
                                                       )
                                                  )
                                             }}
                                        ></Checkbox>
                                        <Typography>
                                             Select All{" "}
                                             {`(${productsOrder.length})`}{" "}
                                        </Typography>
                                   </Box>

                                   <Button onClick={handlerClickDeleteAll}>
                                        Delete all
                                   </Button>
                              </Box>
                              <Box className="flex items-center gap-[100px]">
                                   <Typography>
                                        Total
                                        {`(${
                                             checkItems.filter((check) => check)
                                                  .length
                                        } ${
                                             checkItems.filter((check) => check)
                                                  .length > 1
                                                  ? "items"
                                                  : "item"
                                        } )`}
                                        :{totalPrice}$
                                   </Typography>
                                   <Button
                                        disabled={
                                             checkItems.filter((check) => check)
                                                  .length < 1
                                                  ? true
                                                  : false
                                        }
                                        onClick={handlerCheckOut}
                                        className={`border border-solid rounded w-[200px] h-[45px] bg-orange-600 text-white hover:bg-orange-400`}
                                   >
                                        Check Out
                                   </Button>
                              </Box>
                         </Box>
                    </Box>
               </>
          )
     }
}
export default Cart
