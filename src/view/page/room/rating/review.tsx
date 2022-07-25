import {useAppSelector} from "lib/store";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const Review = (props:any) => {
    const state = useAppSelector(state => state.room_page);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <Box>
            <Typography id="modal-modal-title" component="div" variant="h6" sx={{
                width:1,
                overflow : "hidden",
                textOverflow : "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                fontSize:"1.4rem",
            }}>
                {state.roomInfo.review[props.index].comment}
            </Typography>
            <Box sx={{height:"1rem"}}/>
            <Typography id="modal-modal-title" variant="h6" sx={{textDecorationLine: "underline", cursor:"pointer"}} onClick={handleOpen}>
                더 보기 &gt;
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={{
                    width: "50vw",
                    height: "90vh",
                    padding: "2rem",
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    overflow: "scroll",
                    backgroundColor: 'secondary.main'
                }}>
                    <Typography id="modal-modal-title" variant="h6" sx={{
                        marginTop:"1rem",
                        wordBreak: "break-all",
                        whiteSpace: "pre-line",
                        lineClamp: 3,
                    }}>
                        {state.roomInfo.review[props.index].comment}
                    </Typography>
                </Box>
            </Modal>
        </Box>
    )
}
export default Review;
