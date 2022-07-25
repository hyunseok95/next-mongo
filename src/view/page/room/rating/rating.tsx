import {useAppSelector} from "lib/store";
import Box from "@mui/material/Box";
import {CustomImage} from "lib/styles";
import {AWS_S3_API} from "lib/env";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Review from "view/page/room/rating/review";
import {styled} from "@mui/material/styles";
import Rating from "@mui/material/Rating";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const CustomRating = (props: any) => {
    const state = useAppSelector(state => state.room_page);
    return (
        <Box sx={{
            display: "flex",
            flexFlow: "column nowrap"
        }}>
            <Box sx={{
                display: "flex",
            }}>
                <CustomImage width="5rem"
                             height="5rem"
                             style={{borderRadius: "2.5rem"}}
                             src={`${AWS_S3_API}/user/${state.roomInfo.review[props.index].profile}/1.jpg`}
                />
                <Box sx={{width:"1rem"}}/>
                <Box sx={{
                    display: "flex",
                    flexFlow: "column nowrap",
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems:"center",
                    }}>
                        <StyledRating
                            defaultValue={state.roomInfo.review[props.index].star}
                            icon={<StarIcon fontSize="inherit" />}
                            emptyIcon={<StarBorderIcon  fontSize="inherit" />}
                            sx={{color:"red"}}
                            readOnly
                        />
                        <Typography variant="h6">{state.roomInfo.review[props.index].star}</Typography>
                    </Box>
                    <Typography variant="body1" sx={{fontWeight: 600}}>
                        {state.roomInfo.review[props.index].name}
                    </Typography>
                    <Typography variant="body1" sx={{color:"gray"}}>
                        {(state.roomInfo.review[props.index].create_at as string).split("T").at(0)}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{height:"1rem"}}/>
            <Review index={props.index}/>
        </Box>
    )
}

export default CustomRating;