import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {useDispatch} from "react-redux";
import {useAppSelector} from "lib/store";
import {putDefaultDialog} from "state/common/dialog";


const CustomDialog = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const dialog = useAppSelector(state => state.dialog);
    const dispatch = useDispatch();

    return (
            <Dialog
                fullScreen={fullScreen}
                open={dialog.onDialog}
                onClose={() => {dispatch(putDefaultDialog())}}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    {dialog.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialog.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus
                            onClick={() => {dispatch(putDefaultDialog())}}>
                        Disagree
                    </Button>
                    <Button onClick={dialog.handleAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
    );
}

export default CustomDialog;

