import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {keyframes, styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {getPayloadProps} from "lib/store/reducer";
import {useAppSelector} from "lib/store";
import {MapLoader} from "lib/map";
import {patchListPage} from "state/page/list";
import Navbar from "view/common/navbar";
import Footer from "view/common/footer";
import Map from "view/page/list/map";
import Navi from "view/page/list/navi";
import List from "view/page/list/list";

const animation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const Body = styled(Box)(({theme})=>({
    display: "flex",               //플렉스 컨테이너 정의
    flexFlow: "column nowrap",  //df: row nowrap    //방향(주 축)과 래퍼타입(줄 바꿈) 단축 설정
    justifyContent:"center",  //df: flex-start    //주 축의 정렬 방법
    alignItems: "center",     //df: stretch     //교차 축의 정렬방법 (1줄)
    alignContent:"center",    //df: stretch     // 교차 축의 정렬방법 (2줄 이상, 여백 있을 경우만)
    animation: `${animation} 1s`,
    backgroundColor: theme.palette.primary.main,
}))

const Section  = styled(Box)(({theme})=>({
    display: "flex",               //플렉스 컨테이너 정의
    flexFlow: "row nowrap",  //df: row nowrap    //방향(주 축)과 래퍼타입(줄 바꿈) 단축 설정
    justifyContent:"space-between",  //df: flex-start    //주 축의 정렬 방법
    alignItems: "stretch",     //df: stretch     //교차 축의 정렬방법 (1줄)
    alignContent:"stretch",    //df: stretch     // 교차 축의 정렬방법 (2줄 이상, 여백 있을 경우만)
    width: "95vw",
}))

interface ListPageProps {
    map: {
        lat?: number;
        lng?: number;
    };
    page?: number;
}

const ListPage = ({map, page}: ListPageProps ) => {
    const state = useAppSelector(state=> state.list_page);
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement | undefined>(undefined);

    useEffect(() => {
        MapLoader.deleteScript()
        if(map.lat && map.lng){
            dispatch(patchListPage(getPayloadProps(
                "map", {
                    lat: map.lat,
                    lng: map.lng,
                }
            )))
            const _center = {
                lat: map.lat,
                lng: map.lng,
            }
            MapLoader.load().then((google) => {
                if (ref.current && !state.googleMap) {
                    dispatch(patchListPage(getPayloadProps(
                        "googleMap", new google.maps.Map(ref.current, {
                            center: _center,
                            zoom: 15,
                        })
                    )))
                }
            })}
        if(page){
            dispatch(patchListPage(getPayloadProps(
                "page", page
            )))
        }
        MapLoader.deleteScript()
        return function () {
            MapLoader.deleteScript()
        }
    }, [map, page]);



    return (
        <Body>
            <Navbar/>
            <Box sx={{height:"8rem"}} />
            <Section>
                <Map mapRef={ref}/>
                <Box sx={{width:"2vw"}} />
                <List />
            </Section>
            <Box sx={{height:"2rem"}} />
            <Navi />
            <Footer />
        </Body>
    )
}

export default ListPage;


