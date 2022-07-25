import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useAppSelector} from "lib/store";

const RoomTitle = () => {
    const state = useAppSelector(state => state.room_page);
    return (
        <Box>
            <Typography variant="h5" sx={{fontWeight:600}}>
                {state.roomInfo.room.name}
            </Typography >
            <Box sx={{
                display: "flex",
                width:"70vw",
                alignItems: 'center',
                justifyContent: 'center',
                margin:"1rem 0",
            }}>
                <StarIcon sx={{color: "red"}}/>
                <Typography variant="h6" sx={{ml:1, fontWeight:600}}>
                    {`${state.roomInfo.roomOption.avg_star} · `}
                    {`후기 ${state.roomInfo.roomOption.count_comment} 개 `}
                    {` · 🎀 슈퍼호스트 · `}
                    {state.roomInfo.room.location}
                </Typography >
                <Box sx={{flexGrow: 1}}></Box>
                <IosShareIcon />
                <Typography variant="body1" sx={{ml:1, fontWeight:600}}>
                    <Link href="">공유하기</Link>
                </Typography >
                <Box sx={{width: "1rem"}}></Box>
                <FavoriteBorderIcon />
                <Typography variant="body1" sx={{ml:1, fontWeight:600}}>
                    <Link href="">저장</Link>
                </Typography >
            </Box>
        </Box>
    )
}
export default RoomTitle;