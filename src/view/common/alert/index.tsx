import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useDispatch} from "react-redux";
import {putDefaultAlert} from "state/common/alert";
import {useAppSelector} from "lib/store";

const CustomAlert = () => {
    const alert = useAppSelector(state => state.alert);
    const dispatch = useDispatch();

    return(
        <Snackbar
            open={alert.onAlert}
            onClose={ () => dispatch(putDefaultAlert())}
            autoHideDuration={5000}>
            <Alert
                variant="filled"
                severity={alert.config}
                onClose={ () => dispatch(putDefaultAlert())}
                sx={{width: '100%'}}>
                {alert.content}
            </Alert>
        </Snackbar>
    )
}

export default CustomAlert;








