import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import {styled} from "@mui/material/styles";
import Reservation from "./reservation";
import {CustomImage} from "lib/styles";
import {useAppSelector} from "lib/store";
import {AWS_S3_API} from "lib/env";
import Introduction from "view/page/room/detail/introduction";
import Calender from "view/page/room/detail/calender";

const Body = styled(Box)(({theme})=>({
    display: "flex",
    width:"70vw",
}))

const RoomDetail = () => {
    const state = useAppSelector(state => state.room_page);
    return (
        <Body>
            <Box sx={{
                width:"45vw",
                display: "flex",
                flexFlow: "column nowrap",
            }}>
                <Box sx={{display:"flex", height:"5rem", alignItems:"center"}}>
                    <Box sx={{display:"flex", flexDirection: "column"}}>
                        <Typography variant="h5" gutterBottom sx={{fontWeight:600}}>
                            {state.roomInfo.host.nickname}
                            {`님이 호스팅하는 집의 ${state.roomInfo.room.type}`}
                        </Typography >
                        <Typography variant="h6" sx={{fontWeight:600}}>
                            {`최대 인원 ${state.roomInfo.room.guest}명 · `}
                            {`침실 ${state.roomInfo.roomOption.bedroom}개 · `}
                            {`침대 ${state.roomInfo.roomOption.bed}개 · `}
                            {`단독 사용 욕실 ${state.roomInfo.roomOption.bathroom}개`}
                        </Typography >
                    </Box>
                    <Box sx={{flexGrow: 1}}/>
                    <CustomImage
                        width="4rem"
                        height="4rem"
                        src={`${AWS_S3_API}/user/${state.roomInfo.host["profile"]}/1.jpg`}
                        priority
                    />
                </Box>
                <Divider variant="fullWidth" sx={{margin:"3rem 0"}} />
                <Typography id="modal-modal-title" variant="h6" sx={{
                    wordBreak: "break-all",
                    whiteSpace: "pre-line",
                    textOverflow: "ellipsis",
                    height:"10rem",
                    overflow: 'hidden',
                }}>
                    {state.roomInfo.room.introduction}
                </Typography>
                <Typography id="modal-modal-title" variant="h6">
                    ...
                </Typography>
                <Introduction />
                <Divider variant="fullWidth" sx={{margin:"3rem 0"}} />
                <Calender />
            </Box>
            <Box sx={{flexGrow:1}}></Box>
            <Reservation />
        </Body>

    )
}

export default RoomDetail;
