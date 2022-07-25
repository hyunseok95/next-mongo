import Box from "@mui/material/Box";
import * as React from "react";
import {keyframes, styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Button from "@mui/material/Button";
import {useAppSelector} from "lib/store";
import {useState} from "react";


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
const Body = styled(Box)(({theme})=>({
    width:"20vw",
    height:"28rem",
    display: "flex",
    flexFlow: "column nowrap",
    boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2)," +
        " 0px 4px 5px 0px rgba(0,0,0,0.14)," +
        " 0px 1px 10px 0px rgba(0,0,0,0.12)",
    position: 'sticky',
    top: '10rem',
    padding: "1.5rem",
}))

const Reservation = () => {
    const state = useAppSelector(state => state.room_page);

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Body component="form" onSubmit={()=>{}} >
            <Typography id="modal-modal-title" component="div" variant="h5" sx={{
                wordBreak: "keep-all",
                whiteSpace: "pre-line",
            }}>
                {"요금을 확인하려면 날짜를 입력하세요."}
            </Typography>
            <Box sx={{height:"0.5rem"}} />
            <Typography variant="h6" component="div" sx={{
                fontWeight:600,
                display: "flex",
                alignItems: 'center',
            }}>
                <StarIcon sx={{color: "red", mr: ".5rem"}}/>
                {`${state.roomInfo.roomOption.avg_star} · `}
                {`후기 ${state.roomInfo.roomOption.count_comment} 개 `}
            </Typography >
            <Box sx={{height:"1.5rem"}} />
            <Box sx={{
                position:"relative",
                width:"100%",
                border:"1px solid grey",
                borderRadius:"1rem",
                display: "grid",
                gridTemplateRows:"repeat(2, 1fr)",
                gridTemplateColumns:"repeat(4, 1fr)",
                // gridTemplate:`
                //     "check-in check-out" 1fr
                //     "guest guest" 1fr
                //     /1fr 1fr `,
                gap: "0 0",
                alignItems:"stretch",
                justifyItems:"stretch",
                // gridAutoRows: "minmax(50%, auto))",
                // gridAutoColumns: "minmax(50%, auto))",
                '& > :nth-child(1)': {
                    gridArea: "1 / 1 / 2 / 3",
                    // gridArea: "check-in",
                    // alignSelf:"center",
                    // justifySelf:"center",
                    borderRight:"1px solid grey"
                },
                '& > :nth-child(2)': {
                    gridArea: "1 / 3 / 2 / 5",
                    // gridArea: "check-in",
                },
                '& > :nth-child(3)': {
                    gridArea: "2 / 1 / 3 / 4",
                    borderTop: "1px solid grey"
                    // gridArea: "check-in",
                },
                '& > :nth-child(4)': {
                    gridArea: "2 / 4 / 3 / 5",
                    borderTop: "1px solid grey"
                    // gridArea: "check-in",
                }
            }}>
                <Box
                    onClick={()=>{}}
                    sx={{display: "flex", flexFlow: "column nowrap", padding:"1rem", cursor: "pointer"}}>
                    <Typography  variant="body2" >
                        {"체크 인"}
                    </Typography>
                    <Typography variant="body1" sx={{color: "gray"}} >
                        {"날짜 추가"}
                    </Typography>
                </Box>
                <Box
                    onClick={()=>{}}
                    sx={{display: "flex", flexFlow: "column nowrap", padding:"1rem", cursor: "pointer"}}>
                    <Typography  variant="body2" >
                        {"체크 아웃"}
                    </Typography>
                    <Typography variant="body1" sx={{color: "gray"}} >
                        {"날짜 추가"}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", flexFlow: "column nowrap", padding:"1rem"}}>
                    <Typography  variant="body2" >
                        {"인원"}
                    </Typography>
                    <Typography variant="body1" sx={{color: "gray"}} >
                        {"게스트 1명"}
                    </Typography>
                </Box>
                <Box
                    onClick={handleChange}
                    sx={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        justifyContent: "center",
                        alignItems:"center",
                        cursor: "pointer"
                }}>
                    {checked?
                        <KeyboardArrowUpIcon />
                        : <KeyboardArrowDownIcon />
                    }
                </Box>
                {checked &&
                        <Box sx={{
                            zIndex:1,
                            position:"absolute",
                            top:"100%",
                            left:"0%",
                            borderRadius:"1rem",
                            border:"1px solid grey",
                            backgroundColor:"secondary.main",
                            animation: `${keyframes2} .5s`,
                            width:"100%",
                            display: "grid",
                            gridTemplateRows:"repeat(4, 1fr)",
                            gridTemplateColumns:"60% 40%",
                            gap: "0 0",
                            alignItems:"stretch",
                            justifyItems:"stretch",
                            '& > :nth-child(7)': {
                                gridArea: "4 / 1 / 5 / 3",
                            },
                            '& > :nth-child(8)': {
                                gridArea: "5 / 2 / 6 / 3",
                            },
                        }}>
                            <Box sx={{display:"flex", flexFlow:"column nowrap", padding: "1rem"}}>
                                <Typography  variant="body1" >
                                    {"성인"}
                                </Typography>
                                <Typography variant="body1" sx={{color: "gray"}} >
                                    {"만 13세 이상"}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display:"flex",
                                padding: "1rem",
                                justifyContent: "space-between",
                                alignItems:"center",
                            }}>
                                <RemoveCircleRoundedIcon sx={{cursor: "pointer", fontSize:"2rem"}}/>
                                <Typography  variant="h6" >
                                    {1}
                                </Typography>
                                <AddCircleRoundedIcon sx={{cursor: "pointer", fontSize:"2rem"}}/>
                            </Box>
                            <Box sx={{display:"flex", flexFlow:"column nowrap", padding: "1rem"}}>
                                <Typography  variant="body1" >
                                    {"어린이"}
                                </Typography>
                                <Typography variant="body1" sx={{color: "gray"}} >
                                    {"만 2~12세"}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display:"flex",
                                padding: "1rem",
                                justifyContent: "space-between",
                                alignItems:"center",
                            }}>
                                <RemoveCircleRoundedIcon sx={{cursor: "pointer", fontSize:"2rem"}}/>
                                <Typography  variant="h6" >
                                    {0}
                                </Typography>
                                <AddCircleRoundedIcon sx={{cursor: "pointer", fontSize:"2rem"}}/>
                            </Box>
                            <Box sx={{display:"flex", flexFlow:"column nowrap", padding: "1rem"}}>
                                <Typography  variant="body1" >
                                    {"유아"}
                                </Typography>
                                <Typography variant="body1" sx={{color: "gray"}} >
                                    {"만 2세 미만"}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display:"flex",
                                padding: "1rem",
                                justifyContent: "space-between",
                                alignItems:"center",
                            }}>
                                <RemoveCircleRoundedIcon sx={{cursor: "pointer", fontSize:"2rem"}}/>
                                <Typography  variant="h6" >
                                    {0}
                                </Typography>
                                <AddCircleRoundedIcon sx={{cursor: "pointer", fontSize:"2rem"}}/>
                            </Box>
                            <Box sx={{display:"flex", flexFlow:"column nowrap", padding: "1rem"}}>
                                <Typography id="modal-modal-title" component="div" variant="body2" sx={{
                                    wordBreak: "keep-all",
                                }}>
                                    {"이 숙소의 최대 숙박 인원은 2명(유아 포함)입니다. 반려동물 동반은 허용되지 않습니다."}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display:"flex",
                                justifyContent:"flex-end",
                                padding: "1rem"}}>
                                <Typography id="modal-modal-title" component="div" variant="body1"
                                            onClick={()=>{setChecked(false)}}
                                sx={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                }}>
                                    {"닫기"}
                                </Typography>
                            </Box>
                        </Box>

                }
            </Box>
            <Box sx={{height:"1.5rem"}} />
            <Box sx={{
                width:"100%",
                display:"flex",
            }}>
                <Button
                    variant="contained"
                    onClick={()=>{}}
                    sx={{
                        width:"100%",
                        height:"4rem",
                        fontSize:"1.5rem"
                    }}
                >
                    예약료 계산하기
                </Button>

            </Box>
        </Body>
    )
}



export default Reservation;

