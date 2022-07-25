import {useEffect, useRef, useState} from "react";
import theme from "lib/styles";
import {alpha, styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {useRouter} from "next/router";
import {handleAlert} from "handler/common/alert";
import {useDispatch} from "react-redux";
import {MapLoader} from "lib/map";
import {useAppSelector} from "lib/store";

const Body = styled(Box)(({theme})=>({
    display: "flex",
    flexFlow: "column nowrap ",
    justifyContent:"center",
    alignItems: "center"
}))

const Search = styled(Box)(({theme})=>({
    width:"40vw",
    height:"5rem",
    display: "flex",               //플렉스 컨테이너 정의
    flexFlow: "row nowrap ",  //df: row nowrap    //방향(주 축)과 래퍼타입(줄 바꿈) 단축 설정
    justifyContent:"center",  //df: flex-start    //주 축의 정렬 방법
    alignItems: "center",     //df: stretch     //교차 축의 정렬방법 (1줄)
    margin: "1rem 0",
    padding: "1rem 1vw",
    borderRadius: "2rem",
    backgroundColor: alpha(theme.palette.primary.main, 0.9),
    '&:hover ': {
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
        'button' : {
            backgroundColor: alpha(theme.palette.primary.main, 0.5),
        }
    },
    [theme.breakpoints.down('lg')]: {
        width:"70vw",
    },
    [theme.breakpoints.down('md')]: {
        width:"80vw",
    },
    [theme.breakpoints.down('sm')]: {
        // width:"90vw",
    },

}))

const MyTextField = styled(TextField)(({ theme }) => ({
    // minWidth:"50vw",
    flexGrow:1,
    '& label': {
        '&.Mui-focused' : {
        }
    },
    '& .MuiOutlinedInput-root': {
        // transition: theme.transitions.create('width'),
        fontSize: "1rem",
        color: theme.palette.secondary.main,
        '& fieldset': {
            border: "none",
        },
        '&:hover fieldset': {
        },
        '&.Mui-focused fieldset': {
        },
    },
}));


const MyButton = styled(Button)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    color: theme.palette.secondary.main
}));


const NavbarSearch = () => {
    const navbar = useAppSelector(state => state.navbar);

    const dispatch = useDispatch();
    const router = useRouter()

    const [value, setValue] = useState<string>("");
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
    const searchInputRef = useRef<HTMLInputElement | undefined>();

    useEffect(()=> {
        MapLoader.deleteScript()

        const preContainer = document.getElementsByClassName("pac-container");
        if (preContainer) {
            for( const item of preContainer){
                item.remove()
            }
        }

        MapLoader.load().then((google) => {
            const options = {
                componentRestrictions: { country: "kr" },
                fields: ["address_components", "geometry", "icon", "name"],
                strictBounds: false,
                types: ["establishment"],
            };
            if(searchInputRef.current){
                setAutocomplete(new google.maps.places.Autocomplete(searchInputRef.current, options))
            }
            setGeocoder(new google.maps.Geocoder())
        })

        MapLoader.deleteScript()
    }, [])

    useEffect(()=> {

        if(autocomplete){
            google.maps.event.clearListeners(autocomplete, "place_changed")

            autocomplete.addListener("place_changed", () => {
                fillInAddress(autocomplete)
            })
        }
    },[autocomplete])

    function fillInAddress(autocomplete: google.maps.places.Autocomplete) {
        const place = autocomplete.getPlace()
        if(place){
            if(place.geometry && place.geometry.location){
                router.push({
                    pathname:"/list",
                    query: {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    }
                })
            }
        }
    }
    function getListPage(){
        if (value !== ""){
            if(geocoder){
                geocoder.geocode({
                    address: value
                }).then((res)=>{
                        res.results.map((value, index, array)=>{
                            router.push({
                                pathname:"/list",
                                query: {
                                    lat: value.geometry.location.lat(),
                                    lng: value.geometry.location.lng()
                                }
                            })
                        })
                }).catch((reason)=>{
                    handleAlert(dispatch,"올바르지 않은 검색 키워드 입니다.", "error")
                })
            }
        }else {
            handleAlert(dispatch,"검색어를 입력해 주십시오", "error")
        }
    }

    return (
        <Body>
            <Search sx={{
                border: `${navbar.state !== "home" && `3px solid ${theme.palette.secondary.main}`}`,
            }}>
                <MyTextField
                    id="pac-input"
                    placeholder="검 색 ..."
                    inputRef={searchInputRef}
                    value={value}
                    onChange={(e) => {
                        e.preventDefault()
                        setValue(e.currentTarget.value)
                    }}
                />
                <MyButton variant="contained" onClick={getListPage}>
                    <SearchIcon /> 검색
                </MyButton>
            </Search>
        </Body>

    )
}

export default NavbarSearch

