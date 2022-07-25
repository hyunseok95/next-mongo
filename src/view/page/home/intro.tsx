import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CustomImage} from "lib/styles";

const Intro = () => {

    return(
        <>
            <CustomImage
                width="100vw"
                height="50rem"
                src="/main-header.png"
                sx={{
                    position:'absolute',
                    top: 0,
                }}
                style={{}}
                priority
            />
            <Box
                sx={{
                    position:'absolute',
                    display: "flex",
                    flexDirection:"column",
                    alignItems:"center",
                    "& span" : {
                        fontWeight:600
                    }
                }}
            >
                <Typography variant="h2" component="span" gutterBottom >
                    새로운 여행을
                </Typography >
                <Typography variant="h2" component="span" gutterBottom >
                    지금 계획 하세요!
                </Typography >
                <Typography variant="h5" component="span" gutterBottom >
                    우리가 당신이 꿈꾸던 여행을
                </Typography >
                <Typography variant="h5" component="span" gutterBottom >
                    이룰 수 있게 도와드리겠습니다.
                </Typography >
            </Box>
        </>
    )
}

export default Intro;

