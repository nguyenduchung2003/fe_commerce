"use client"
import {
    Button,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Typography,
    IconButton,
    Collapse,
    Box,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useRouter } from "next/navigation"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { useState } from "react"
import Image from "next/image"
import React from "react"
import { ToastContainer } from "react-toastify"
import ModalUpdateProduct from "./ModalUpdateProduct/ModalUpdateProduct"
import ModalAddProduct from "./ModalAddProduct/ModalAddProduct"
import { toastCustom } from "../Custom/CustomToast"

const TableProducts = ({
    data,
    deleteProduct,
    dataGetAllCategories,
    updateProduct,
    addProduct,
}: {
    dataGetAllCategories: dataGetAllCategoriesType[]
    data: arrayProducts
    deleteProduct: (product: {
        productId: number
        variantId: number
        deleteVariant: boolean
    }) => Promise<any>
    updateProduct: (product: products) => Promise<any>
    addProduct: (product: products) => Promise<any>
}) => {
    const dataTable = data.products
    const router = useRouter()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [arrayCheck, setArrayCheck] = useState<boolean[]>(
        Array.from({ length: dataTable.length }, () => false)
    )
    const handlerDeleteVariants = (variantId: number, productID: number) => {
        toastCustom("success", "Delete variant product success!", async () => {
            await deleteProduct({
                productId: productID,
                variantId: variantId,
                deleteVariant: true,
            })
        })
    }
    const handlerDeleteProducts = async (productID: number) => {
        toastCustom("success", "Delete product success!")
        console.log("delete product", productID)
        await deleteProduct({
            productId: productID,
            variantId: 0,
            deleteVariant: false,
        })
    }
    const [productDetail, setProductDetail] = useState<products | undefined>(
        undefined
    )
    const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)
    return (
        <>
            <ToastContainer />
            <ModalUpdateProduct
                openModal={openModal}
                setOpenModal={setOpenModal}
                dataGetAllCategories={dataGetAllCategories}
                productDetail={productDetail as products}
                updateProduct={updateProduct}
            />
            <ModalAddProduct
                openModalAdd={openModalAdd}
                setOpenModalAdd={setOpenModalAdd}
                dataGetAllCategories={dataGetAllCategories}
                addProduct={addProduct}
            />
            <Button
                // onClick={() => router.push("/productmanagement/addproducts")}
                onClick={() => setOpenModalAdd(true)}
                className="border border-solid my-5"
            >
                Add new product
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Name</TableCell>

                            <TableCell>Image</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="left">Delete</TableCell>
                            <TableCell align="left">Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map((row, index) => (
                            <React.Fragment key={row.id}>
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => {
                                                setArrayCheck(
                                                    (prevArrayCheck) => {
                                                        const newArrayCheck = [
                                                            ...prevArrayCheck,
                                                        ]
                                                        newArrayCheck[index] =
                                                            !newArrayCheck[
                                                                index
                                                            ]
                                                        return newArrayCheck
                                                    }
                                                )
                                            }}
                                        >
                                            {arrayCheck[index] ? (
                                                <KeyboardArrowUpIcon />
                                            ) : (
                                                <KeyboardArrowDownIcon />
                                            )}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className="">
                                        <Typography>{row.name}</Typography>
                                    </TableCell>

                                    <TableCell align="left" className="">
                                        <Image
                                            src={row.image[0]}
                                            alt="Picture of the author"
                                            width={100}
                                            height={50}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className=" truncate "
                                    >
                                        {row.description}
                                    </TableCell>

                                    <TableCell align="left">
                                        <IconButton
                                            onClick={() =>
                                                handlerDeleteProducts(
                                                    row.id as number
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton
                                            onClick={() => {
                                                setProductDetail(row)

                                                setOpenModal(true)
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        style={{
                                            paddingBottom: 0,
                                            paddingTop: 0,
                                        }}
                                        colSpan={6}
                                    >
                                        <Collapse
                                            in={arrayCheck[index]}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <Box sx={{ margin: 1 }}>
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    component="div"
                                                >
                                                    Variants
                                                </Typography>
                                                {row.variants.length > 0 ? (
                                                    <Table
                                                        size="small"
                                                        aria-label="purchases"
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                {row.variants[0]?.options?.map(
                                                                    (
                                                                        variants
                                                                    ) => (
                                                                        <TableCell
                                                                            align="left"
                                                                            key={
                                                                                variants.option_id
                                                                            }
                                                                        >
                                                                            {
                                                                                variants.name
                                                                            }
                                                                        </TableCell>
                                                                    )
                                                                )}
                                                                <TableCell align="left">
                                                                    Quantity
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    Price ($)
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    Delete
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {row.variants?.map(
                                                                (variants) => (
                                                                    <TableRow
                                                                        key={
                                                                            variants.variant_id
                                                                        }
                                                                    >
                                                                        {variants.options.map(
                                                                            (
                                                                                option
                                                                            ) => (
                                                                                <TableCell
                                                                                    align="left"
                                                                                    key={
                                                                                        option.option_id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        option.value
                                                                                    }
                                                                                </TableCell>
                                                                            )
                                                                        )}

                                                                        <TableCell align="left">
                                                                            {
                                                                                variants.quantity
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell align="left">
                                                                            {
                                                                                variants.price
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell align="left">
                                                                            <IconButton
                                                                                onClick={() =>
                                                                                    handlerDeleteVariants(
                                                                                        variants.variant_id as number,
                                                                                        row.id as number
                                                                                    )
                                                                                }
                                                                            >
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                ) : (
                                                    <Typography>
                                                        No variants
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default TableProducts
