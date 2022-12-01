import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from "@mui/material";

export default function PositionedSnackbar(props) {
    const [snackPack, setSnackPack] = React.useState([]);
    const [open, setOpen] = React.useState(true);
    const [messageInfo, setMessageInfo] = React.useState(undefined);

    React.useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({...snackPack[0]});
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        props.resetAuthErrors();
        setMessageInfo(undefined);
    };

    const vertical = "top";
    const horizontal = "right";

    return (
        <div>
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                TransitionProps={{onExited: handleExited}}
                anchorOrigin={{vertical, horizontal}}
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{p: 0.5}}
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </React.Fragment>
                }
            >
                <div style={{ marginTop: `${props.index * 50}px`}}>
                    <Alert
                        onClose={handleClose}
                        severity="error">{props.message}</Alert>
                </div>
            </Snackbar>
        </div>
    );
}