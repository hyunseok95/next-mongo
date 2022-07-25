import {useEffect} from 'react';
import NavbarSearch from './search';
import {keyframes, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MyToolbar from "./toolbar";
import {useAppSelector} from "lib/store";
import {useDispatch} from "react-redux";
import {patchNavbar} from "state/common/navbar";
import {getPayloadProps} from "lib/store/reducer";


const keyframes1 = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
     transform: scale(1);
     opacity: 1;
  }
`

const keyframes2 = keyframes`
    0% {
        opacity: 0;
        transform: translate3d(0, -20%, 0);
    }
    to {
        opacity: 1;
        transform: translateZ(0);
    }
`

interface NavbarProps {
    state?: string;
}

const CustomAppBar = styled(AppBar)<NavbarProps>(({theme, state})=>({
    display:"flex",
    flexFlow: "column nowrap",
    justifyContent:"center",
    alignItems: "center",
    ...(state === "home" && {
        backgroundColor:"transparent",
        marginTop:"2rem",
        "&.MuiPaper-root" : {
            transition: "none",
            boxShadow:"none",
        }
    }),
}))

const Navbar = ({state = "default"}: NavbarProps) => {
    const navbar = useAppSelector(state => state.navbar);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(state) {
            dispatch(patchNavbar(getPayloadProps("state",state)))
        }
    },[state])

    useEffect(() => {

        function updateNavbarState(){
            dispatch(patchNavbar(getPayloadProps("search",false)))
        };

        window.addEventListener("scroll", updateNavbarState);
        return function () {
            window.removeEventListener("scroll", updateNavbarState);
        };
    }, [navbar.search]);


    return (
            <CustomAppBar state={navbar.state}>
                <Box sx={{animation: `${(navbar.state === "home-active" && !navbar.search ) && `${keyframes1} .2s`}`}}>
                    <MyToolbar />
                </Box>
                { (navbar.state === "home" || navbar.search ) &&
                    <Box sx={{animation: `${navbar.search && `${keyframes2} .5s`}`}}>
                        <NavbarSearch />
                    </Box>
                }
            </CustomAppBar>
    );
}
export default Navbar;

