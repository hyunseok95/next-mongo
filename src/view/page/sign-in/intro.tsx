import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";


const FlexBox = styled(Box)(({theme})=>({
    display: "flex",               //플렉스 컨테이너 정의
    flexFlow: "column nowrap",  //df: row nowrap    //방향(주 축)과 래퍼타입(줄 바꿈) 단축 설정
    justifyContent:"center",  //df: flex-start    //주 축의 정렬 방법
    backgroundColor: theme.palette.secondary.main,
}))

const Intro = () => {
    return (
        <FlexBox>
            <Typography variant="h3" component="div" gutterBottom >
                지금 바로 로그인 하세요!
            </Typography >
            <Typography variant="h4" component="div" gutterBottom mt={2} >
                로그인을 하신 뒤 저희
            </Typography>
            <Typography variant="h4" component="div" gutterBottom >
                한품이 제공하는 풍부한 기능을
            </Typography>
            <Typography variant="h4" component="div" gutterBottom >
                마음 껏 누리시길 바랍니다.
            </Typography>
            <Typography variant="h4" component="div" gutterBottom  mt={2} >
                After logging in, we hope that
            </Typography>
            <Typography variant="h4" component="div" gutterBottom  >
                you can fully enjoy the rich features
            </Typography>
            <Typography variant="h4" component="div" gutterBottom  >
                provided by our HANFOOM.
            </Typography>
        </FlexBox>
    )
}
export default Intro
