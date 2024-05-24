import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { forwardRef, Fragment } from "react"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialog({
    openDiaLog,
    setOpenDiaLog,
    setOpen,
}: {
    openDiaLog: boolean
    setOpenDiaLog: React.Dispatch<React.SetStateAction<boolean>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const handleClose = () => {
        setOpenDiaLog(false)
        setOpen(false)
    }
    const handleDisagree = () => {
        setOpenDiaLog(false)
    }
    return (
        <Fragment>
            <Dialog
                open={openDiaLog}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you close?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you close the data will not be saved
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
