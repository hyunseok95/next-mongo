import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {keyframes, styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import RoomTitle from "./title";
import RoomImage from "./image";
import RoomDetail from "./detail";

import {useAppSelector} from "lib/store";
import {getRoomInfo} from "handler/page/room";
import Footer from "view/common/footer";
import Navbar from "view/common/navbar";
import RoomRating from "view/page/room/rating";

const animation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`
const Body = styled(Box)(({theme})=>({
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    animation: `${animation} 1s`,
}))

const Section  = styled(Box)(({theme})=>({
    width:"85vw",
    display:"flex",
    flexFlow:"column nowrap",
    alignItems: 'center',
    borderRadius: "3rem",
    backgroundColor: theme.palette.secondary.main,
}))

interface RoomPageProps {
    roomId?: number;
}

const RoomPage = ({roomId}: RoomPageProps) => {
    const state = useAppSelector(state => state.room_page);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(roomId){
            getRoomInfo(roomId,dispatch)
        }
    },[roomId])

    return (
        <Body>
            <Navbar />
            <Box sx={{height:"8rem"}}/>
            {state.roomInfo?
                <Section>
                    <Box sx={{height:"4rem"}}/>
                    <RoomTitle />
                    <Box sx={{height:"1rem"}}/>
                    <RoomImage />
                    <Box sx={{height:"5rem"}}/>
                    <RoomDetail/>
                    <Box sx={{height:"5rem"}}/>
                    <RoomRating />
                </Section>
                : <Section sx={{height: "100rem"}}/>
            }
            <Footer />
        </Body>
    )
}

export default RoomPage;
