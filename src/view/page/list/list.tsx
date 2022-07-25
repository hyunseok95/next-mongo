import Box from '@mui/material/Box';
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";
import {CustomImage} from "lib/styles";
import {getRoomList} from "handler/page/list";
import {useAppSelector} from "lib/store";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {AWS_S3_API} from "lib/env";

const Body = styled(Box)(({theme})=>({
    width: "57vw",
    display:"flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    borderRadius: "2rem",
    padding:"3rem 5rem",
    backgroundColor: theme.palette.secondary.main,
}))

const RowWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexFlow:"column nowrap",
    justifyContent:"space-around",
    cursor:"pointer",
    "& .MuiTypography-root" : {
        overflow : "hidden",
        textOverflow : "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
    }
}));


const List= () => {
    const state = useAppSelector(state=> state.list_page);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() =>{
        if(state.map.lat && state.map.lng && state.page){
            getRoomList(state,dispatch,router)
        }
    },[state.map, state.page])



    return (
        <Body>
            <Typography component="h1" variant="h5" gutterBottom  sx={{ fontWeight: 600}}>
                Jeonju-si에 위치한 300개 이상의 숙소
            </Typography >
            <Typography component="h1" variant="h6" sx={{ fontWeight: 600}}>
                여행 날짜와 게스트 인원수를 입력하면 1박당 총 요금을 확인할 수 있습니다.
            </Typography >
            <Box sx={{height:"2rem"}} />
            {state.list ? state.list.map((item: any) => (
                <RowWrapper
                    key={item.id}
                    onClick={()=>{
                        router.push({
                            pathname:`/room`,
                            query: {
                                roomId: item.id
                            }
                        })
                    }}
                >
                    <Divider  variant="fullWidth" />
                    <Box sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent:"space-between",
                        margin:"2rem 0",
                        cursor:"pointer",
                    }}>
                        <CustomImage
                            width="35%"
                            height="17rem"
                            src={`${AWS_S3_API}/room/${item["image_directory"]}/1.jpg`}
                        />

                        <Box sx={{
                            display: "flex",
                            flexFlow: "column nowrap",
                            width: "60%",
                            p: "1rem 0",
                        }}>
                            <Typography variant="body1" sx={{fontWeight:600}}>
                                {`${item.location}의 ${item.type}`}
                            </Typography >
                            <Typography variant="h6" sx={{fontWeight:600}}>
                                {`${item.name}`}
                            </Typography >
                            <Divider  variant="middle" sx={{ margin:"1rem 0"}} />
                            <Typography variant="body1" sx={{fontWeight:600}}>
                                {`최대 인원 ${item.guest}명 · 
                                침실 ${item.bedroom}개 · 
                                침대 ${item.bed}개 · 
                                단독 사용 욕실 ${item.bathroom}개`}
                            </Typography >
                            <Typography variant="body1" sx={{fontWeight:600}}>
                                {`${(item.is_parking === 1 )? "무료 주차 공간" : ""}
                                ${((item.is_parking === 1)&&(item.is_wifi === 1))?" · ":""}
                                ${(item.is_wifi === 1)? "와이 파이" : ""}`}
                            </Typography >
                            <Box sx={{flexGrow: 1}} />
                            <Typography variant="h6" sx={{fontWeight:600, alignSelf:"flex-end"}}>
                                <StarIcon sx={{pt: 1, color: "red"}}/>{`${item.avg_star} · 후기 ${item.count_comment}개`}
                            </Typography >
                        </Box>
                    </Box>

                </RowWrapper>

            )) :  <Typography variant="h2" sx={{fontWeight:600}}>
                {state.no_list}
            </Typography >}

        </Body>
    );
}

export default List;

