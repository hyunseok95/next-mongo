import {useState} from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {useAppSelector} from "lib/store";

const Introduction = () => {
    const state = useAppSelector(state => state.room_page);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Typography
                id="modal-modal-title"
                variant="h6"
                sx={{
                    cursor:"pointer",
                    textDecorationLine: "underline"
                }}
                onClick={handleOpen}>
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
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        숙소 설명
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" sx={{
                        marginTop:"1rem",
                        wordBreak: "break-all",
                        whiteSpace: "pre-line",
                        lineClamp: 3,
                    }}>
                        {state.roomInfo.room.introduction}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default Introduction;