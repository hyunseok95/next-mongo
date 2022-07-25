import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {alpha} from "@mui/material/styles";
import theme, {CustomImage} from "lib/styles";
import {useAppSelector} from "lib/store";
import {AWS_S3_API} from "lib/env";

const RoomImage = () => {
    const state = useAppSelector(state => state.room_page);

    return (
        <Box sx={{
            display:"flex",
            width:"70vw",
        }}>
            <CustomImage
                width="34.5vw"
                height="40rem"
                src={`${AWS_S3_API}/room/${state.roomInfo.room["image_directory"]}/1.jpg`}
                priority
            />
            <Box sx={{flexGrow: 1}}/>
            <Box sx={{
                display: "flex",
                flexFlow: "column nowrap",
                width:"34.5vw",
            }}>
                <Box sx={{
                    display: "flex",
                    width:"34.5vw",
                }}>
                    <CustomImage
                        width="16.75vw"
                        height="19.5rem"
                        src={`${AWS_S3_API}/room/${state.roomInfo.room["image_directory"]}/2.jpg`}
                    />
                    <Box sx={{flexGrow: 1}}/>
                    <CustomImage
                        width="16.75vw"
                        height="19.5rem"
                        src={`${AWS_S3_API}/room/${state.roomInfo.room["image_directory"]}/3.jpg`}
                    />
                </Box>
                <Box sx={{flexGrow: 1}}/>
                <Box sx={{
                    display: "flex",
                    width:"34.5vw",
                }}>
                    <CustomImage
                        width="16.75vw"
                        height="19.5rem"
                        src={`${AWS_S3_API}/room/${state.roomInfo.room["image_directory"]}/4.jpg`}
                    />
                    <Box sx={{flexGrow: 1}}/>
                    <CustomImage
                        width="16.75vw"
                        height="19.5rem"
                        src={`${AWS_S3_API}/room/${state.roomInfo.room["image_directory"]}/5.jpg`}
                        sx={{
                            position:"relative"
                        }}>
                        <Button sx={{
                            fontSize:"1rem",
                            position: "absolute",
                            top:"80%",
                            left:"50%",
                            transform: 'translate(-50%, -50%)',
                            backgroundColor:'secondary.main',
                            '&:hover' :{
                                backgroundColor:alpha(theme.palette.secondary.main, 0.8),
                            }
                        }}>:: 사진 모두 보기</Button>
                    </CustomImage>
                </Box>
            </Box>
        </Box>
    )
}
export default RoomImage;