import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';
import StarIcon from "@mui/icons-material/Star";
import {useAppSelector} from "lib/store";
import CustomRating from "view/page/room/rating/rating";


const Body = styled(Box)(({theme})=>({
    display: "flex",
    flexFlow: "column nowrap",
    width:"70vw",
}))

const RoomRating = () => {
    const state = useAppSelector(state => state.room_page);
    return (
        <Body>
            <Divider variant="fullWidth" sx={{margin:"0 0 3rem 0"}} />
            <Typography variant="h4" component="div" sx={{
                fontWeight:600,
                display: "flex",
                alignItems: 'center',
            }}>
                <StarIcon sx={{color: "red", mr: ".5rem"}}/>
                {`${state.roomInfo.roomOption.avg_star} · `}
                {`후기 ${state.roomInfo.roomOption.count_comment} 개 `}
            </Typography >
            <Box sx={{height:"3rem"}}/>
            <Box sx={{
                width:"100%",
                display: "grid",
                gridTemplateRows:"repeat(3, 1fr)",
                gridTemplateColumns:"repeat(2, 1fr)",
                gap: "5rem 5rem",
                alignItems:"stretch",
                justifyItems:"stretch",
            }}>
                {[0,1,2,3,4,5].map((item) =>
                    state.roomInfo.review[item] &&
                    <CustomRating
                        key={item}
                        index={item}
                    />

                )}
            </Box>
            <Box sx={{height:"10rem"}}/>
        </Body>
    )
}

export default RoomRating;




