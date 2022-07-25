import {useDispatch} from "react-redux";
import {useRouter} from 'next/router'
import {useAppSelector} from "lib/store";
import theme from "lib/styles";
import {alpha, styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchIcon from '@mui/icons-material/Search';
import {getPayloadProps} from "lib/store/reducer";
import {patchToken} from "state/common/token";
import {handleDialog} from "handler/common/dialog";
import {putDefaultDialog} from "state/common/dialog";
import {patchNavbar} from "state/common/navbar";
import HostMenu from "view/common/navbar/host";

const MyToolbar = () => {
    const navbar = useAppSelector(state => state.navbar);
    const token = useAppSelector(state => state.token);
    const dispatch = useDispatch();
    const router = useRouter()

    const MyButton = styled(Button)(({theme}) => ({
        color: theme.palette.secondary.main, //프라이머리메인
        '&:hover': {
            backgroundColor: `${navbar.state === "home"? alpha(theme.palette.primary.main, 0.25) :
                alpha(theme.palette.secondary.main, 0.25) }`,
        },
    }))

    const StyledToolbar = styled(Toolbar)(({theme})=>({
        display:"flex",
        flexFlow: "row nowrap",
        justifyContent:"center",
        width:"80vw",
        height:"5rem",
    }))

    return (
        <StyledToolbar>
            <MyButton
                variant="outlined"
                onClick={()=>{router.push("/")}}
                sx={{
                    mr:"1rem",
                    border: `${navbar.state !== "home" && `3px solid ${theme.palette.secondary.main}`}`,
                    '&:hover': {
                        border: `${navbar.state !== "home" && `3px solid ${theme.palette.secondary.main}`}`
                    }
                }}
            >
                <PeopleOutlineIcon sx={{mr:".5em"}}/>
                HANFOOM
            </MyButton>
            {(navbar.state !== "home" && !navbar.search)&&
                <MyButton
                    onClick={() => {
                        dispatch(patchNavbar(getPayloadProps("search",true)))
                    }}
                    sx={{
                        ml:"1rem"
                    }}
                >
                    <SearchIcon sx={{mr:".5em"}}/>
                    검색 시작하기
                </MyButton>
            }
            <Box sx={{flex:"1 1 auto"}}/>

            <Box sx={{textAlign: "right"}}>
                <HostMenu />
                {token.isLogin ?
                    <MyButton
                        variant="contained"
                        onClick={ () => {
                            handleDialog(dispatch,'알림','로그아웃 하시겠습니까?',
                                ()=> {
                                    dispatch(patchToken(getPayloadProps("isLogin", false)));
                                    dispatch(putDefaultDialog());
                                    router.push('/');
                                })
                        }}
                        sx={{
                            ml:"1rem",
                            backgroundColor: `${navbar.state !== "home" && theme.palette.secondary.main}`,
                            color: `${navbar.state !== "home" ? theme.palette.primary.main : theme.palette.secondary.main}`
                        }}
                    >
                        로그아웃
                    </MyButton>
                    :
                    <MyButton
                        variant="contained"
                        onClick={()=>{router.push("/sign-in")}}
                        sx={{
                            ml:"1rem",
                            backgroundColor: `${navbar.state !== "home" && theme.palette.secondary.main}`,
                            color: `${navbar.state !== "home" ? theme.palette.primary.main : theme.palette.secondary.main}`
                        }}
                    >
                        로그인
                    </MyButton>
                }
                <MyButton
                    onClick={()=>{router.push("/sign-up")}}
                    sx={{ml:"1rem"}}>
                    가입하기
                </MyButton>
            </Box>
        </StyledToolbar>
    );
}
export default MyToolbar;
