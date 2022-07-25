import Typography from '@mui/material/Typography';
import {CustomImage} from "lib/styles";


const Welcome = () => {
    return(
        <>
            <CustomImage
                width="75vw"
                height="50rem"
                src="/main-banner.png"
                sx={{
                    position:'absolute'
                }}
            />
            <Typography
                id="test1"
                gutterBottom
                variant="h3"
                component="div"
                sx={{
                    position:'absolute',
                    color: 'white',
                    top: "45rem"
                }}
            >
                호기심을 자극하는 숙소로 떠나보세요
            </Typography>
        </>
    )
}

export default Welcome;
