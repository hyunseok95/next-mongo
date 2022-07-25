import {useEffect, useState} from "react";
import {keyframes, styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "view/common/navbar";
import Footer from "view/common/footer";
import Intro from "view/page/home/intro";
import Welcome from "view/page/home/welcome";

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

const Header = styled(Box)(({theme})=>({
    position:'relative',
    display: "flex",               //플렉스 컨테이너 정의
    flexFlow: "column wrap",  //df: row nowrap    //방향(주 축)과 래퍼타입(줄 바꿈) 단축 설정
    justifyContent:"center",  //df: flex-start    //주 축의 정렬 방법
    alignItems: "center",     //df: stretch     //교차 축의 정렬방법 (1줄)
    alignContent:"center",    //df: stretch     // 교차 축의 정렬방법 (2줄 이상, 여백 있을 경우만)
    height:"50rem",
    width:"100vw",
    // backgroundSize: "cover",
    '& span' : {
        color: theme.palette.secondary.main,
    }
}))

const Section = styled(Box)(({theme})=>({
    display: "flex",               //플렉스 컨테이너 정의
    flexFlow: "column wrap",  //df: row nowrap    //방향(주 축)과 래퍼타입(줄 바꿈) 단축 설정
    justifyContent:"center",  //df: flex-start    //주 축의 정렬 방법
    alignItems: "center",     //df: stretch     //교차 축의 정렬방법 (1줄)
    width:"90vw",
    height:"65rem",
    backgroundColor: theme.palette.secondary.main,
    borderRadius:"3rem",
    position:'relative'
}))

const PaddingBox = styled(Box)(({theme})=>({
    height:"5rem"
}))

const HomePage = () => {
    const[state, setState] = useState(false);

    useEffect(() => {
        function updateNavbarState(){
            if (document.documentElement.scrollTop >= 200 || document.body.scrollTop >= 200) {
                setState(true);
            } else if (document.documentElement.scrollTop < 200 || document.body.scrollTop < 200) {
                setState(false);
            }
        };

        window.addEventListener("scroll", updateNavbarState);
        return function () {
            window.removeEventListener("scroll", updateNavbarState);
        };
    }, [state]);

    return (
        <Body>
            <Navbar state={!state? "home" : "home-active"} />
            <Header>
                <Intro />
            </Header>
            <PaddingBox />
            <Section>
                <Welcome />
            </Section>
            <Footer />
        </Body>
    )
}

export default HomePage;

