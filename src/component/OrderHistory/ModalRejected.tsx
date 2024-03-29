import { TextField } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import React, { Dispatch, SetStateAction } from "react"
import { confirmOrder, sendEmail } from "@/app/_api/admin"
const ModalRejected = ({
     open,
     setOpen,
     setReason,
     reason,
     dataModal,
}: {
     open: boolean
     setOpen: Dispatch<SetStateAction<boolean>>
     reason: string
     setReason: Dispatch<SetStateAction<string>>
     dataModal: billType[]
}) => {
     const handleClose = () => {
          setOpen(false)
          setReason("")
     }
     const handlerRejected = async (ArrayBillID: billType[]) => {
          const billID = ArrayBillID.map((bill) => bill.id)
          const data = {
               order_id: billID,
               type: "rejected",
          }

          await confirmOrder(data)

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

          const notes = `Order have date ${ArrayBillID[0].date} sum total ${ArrayBillID[0].total_amount} includes ${noteListProduct} has been rejected becasue ${reason}`
          const dataEmail = {
               idUser: ArrayBillID[0].user_id,
               notes: notes,
          }

          await sendEmail(dataEmail)
     }
     return (
          <React.Fragment>
               <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{"Note"}</DialogTitle>
                    <DialogContent>
                         <TextField
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                         />
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleClose}>Disagree</Button>
                         <Button onClick={() => handlerRejected(dataModal)}>
                              Agree
                         </Button>
                    </DialogActions>
               </Dialog>
          </React.Fragment>
     )
}
export default ModalRejected
