import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import React from "react"
import { forwardRef, useState } from "react"
import { cancelBill } from "@/app/_api/users"
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="down" ref={ref} {...props} />
})
type DialogCancelBillProps = {
    openDialog: boolean
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
    billCancel: any
}
export default function DialogCancelBill({
    openDialog,
    setOpenDialog,
    billCancel,
}: DialogCancelBillProps) {
    const handleClickAgree = async () => {
        await cancelBill(billCancel)
        setOpenDialog(false)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    return (
        <React.Fragment>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>Confirm the action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this bill?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleClose}
                    >
                        Disagree
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleClickAgree}
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
