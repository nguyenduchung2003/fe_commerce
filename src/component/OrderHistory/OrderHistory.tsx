"use client"
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"
import { confirmOrder, sendEmail } from "@/app/_api/admin"
import { useState } from "react"
import ModalRejected from "./ModalRejected"

import DialogCancelBill from "./DialogCancelBill"
const OrderHistory = ({
    dataBill,
    checkUser,
}: {
    dataBill: dataBillType
    checkUser: boolean
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [reason, setReason] = useState<string>("")
    const handlerCompleted = async (ArrayBillID: billType[]) => {
        const billID = ArrayBillID.map((bill) => bill.id)
        const dataConfirm = {
            order_id: billID,
            type: "complete",
        }

        await confirmOrder(dataConfirm)

        const noteListProduct = ArrayBillID.reduce((acc, billID) => {
            acc += ` ${billID.quantities} ${billID.name} `
            const variantsLength = billID.variants.length
            billID.variants.forEach((variant, index) => {
                if (variantsLength > 1 && index === variantsLength - 1) {
                    acc += `and ${variant.value} ${variant.name} `
                } else {
                    acc += `have ${variant.value} ${variant.name} `
                }
            })
            acc += "\n"
            return acc
        }, "")

        const notes = `Order have date ${ArrayBillID[0].date} sum total ${ArrayBillID[0].total_amount}  has been completed includes ${noteListProduct}`
        const dataEmail = {
            idUser: ArrayBillID[0].user_id,
            notes: notes,
        }
        await sendEmail(dataEmail)
    }

    const [dataModal, setDataModal] = useState<billType[]>([])
    const handlerOpenModalRejected = () => {
        setOpen(true)
    }
    const [billCancel, setBillCancel] = useState<any>([])

    return (
        <>
            <ModalRejected
                open={open}
                setOpen={setOpen}
                setReason={setReason}
                reason={reason}
                dataModal={dataModal}
            />
            <DialogCancelBill
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                billCancel={billCancel}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Status</TableCell>

                        {!checkUser ? (
                            <TableCell>ConfirmOrder</TableCell>
                        ) : (
                            <TableCell>Action</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataBill?.resultBill?.map((bill) => (
                        <TableRow key={bill[0].id}>
                            <TableCell>{bill[0].id}</TableCell>
                            <TableCell>
                                {bill.map((item) => (
                                    <Box key={item.variant_id}>
                                        <Typography>
                                            {item.name}
                                            {`(${item.quantities})`}
                                        </Typography>
                                    </Box>
                                ))}
                            </TableCell>
                            <TableCell>{bill[0].total_amount}</TableCell>
                            <TableCell>
                                {bill[0].status === 1
                                    ? "Completed"
                                    : bill[0].status === -1
                                    ? "Rejected"
                                    : "Processing"}
                            </TableCell>
                            {!checkUser ? (
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handlerCompleted([...bill])
                                        }
                                        disabled={
                                            bill[0].status === 1
                                                ? true
                                                : bill[0].status === -1
                                                ? true
                                                : false
                                        }
                                    >
                                        Completed
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setDataModal([...bill])
                                            handlerOpenModalRejected()
                                        }}
                                        disabled={
                                            bill[0].status === 1
                                                ? true
                                                : bill[0].status === -1
                                                ? true
                                                : false
                                        }
                                    >
                                        Rejected
                                    </Button>
                                </TableCell>
                            ) : (
                                <TableCell>
                                    <Button
                                        disabled={
                                            bill[0].status === 0 ? false : true
                                        }
                                        onClick={async () => {
                                            // await cancelBill(bill)
                                            setBillCancel(bill)
                                            setOpenDialog(true)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
export default OrderHistory
