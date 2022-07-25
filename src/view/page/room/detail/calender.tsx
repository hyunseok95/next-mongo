import * as React from 'react';
import {useEffect} from 'react';
import {alpha, styled} from '@mui/material/styles';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {PickersDay, PickersDayProps} from '@mui/x-date-pickers/PickersDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import Button from "@mui/material/Button";
import {DayPicker} from "@mui/x-date-pickers/internals";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type CheckInOutDatePair = {
    first: Date
    second: Date
}
const checkInOutDatePairArray: Array<CheckInOutDatePair> = [
    {
        first: new Date(2022,5-1,28-1),
        second:  new Date(2022,5-1,29-1),
    },
    {
        first: new Date(2022,5-1,31-1),
        second:  new Date(2022,6-1,2-1),
    },
    {
        first: new Date(2022,6-1,17-1),
        second:  new Date(2022,6-1,20-1),
    },
]

type CustomPickerDayProps = PickersDayProps<Date> & {
    isReserved: boolean;
};

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'isReserved',
})<CustomPickerDayProps>(({ theme, isReserved }) => ({
    ...(isReserved && {
        color: alpha(theme.palette.text.primary, 0.35),
        pointerEvents: "none",
        textDecoration: "line-through"
    }),
})) as React.ComponentType<CustomPickerDayProps>;

const Calender = () =>  {
    const [date, setDate] = React.useState<Date>(new Date());
    const [nextDate, setNextDate ] = React.useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth()+1));
    const [subDate, setSubDate] = React.useState<Date>(new Date());

    useEffect(() => {
        setNextDate(new Date(
            date.getFullYear(),
            date.getMonth()+1))
    }, [date])

    const renderWeekPickerDay = (
        _date: Date,
        selectedDates: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>,
    ) => {

        function getIsReserved(checkInOutDatePairArray: Array<CheckInOutDatePair>): boolean {
            const result: Array<number> = []
            checkInOutDatePairArray.map((value, index, array) => {
                result.push(isWithinInterval(_date, {
                    start: new Date(value.first.getFullYear(), value.first.getMonth(), value.first.getDate()+1),
                    end: value.second,
                })? 1 : 0)
            })
            if (result.includes(1)){
                return true
            }else {
                return false
            }
        }

        return (
            <CustomPickersDay
                {...pickersDayProps}
                disableHighlightToday
                selected={false}
                isReserved={getIsReserved(checkInOutDatePairArray)}
            />
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{
                display: "flex",
                flexFlow: "column nowrap",
                alignItems: "center",
                width:"45vw",

            }}>
                <Typography variant="h5" sx={{alignSelf: "flex-start"}}>체크인 날짜를 선택해주세요.</Typography>
                <Typography variant="h6" sx={{alignSelf: "flex-start"}}>여행 날짜를 입력하여 정확한 요금을 확인하세요.</Typography>
                <Box sx={{height: "2rem"}}/>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width:"45vw",
                }}>
                    {((date.getFullYear() > new Date().getFullYear())
                        || (date.getMonth() > new Date().getMonth()) )?
                        <ArrowBackIcon sx={{width:"2vw"}}
                                       onClick={()=>{
                                           setDate(new Date(
                                               date.getFullYear(),
                                               date.getMonth()-1))

                                       }}/>
                        :  <Box sx={{width:"2vw"}}/>
                    }
                    <Typography variant="h6">{`${date.getFullYear()} 년 ${date.getMonth() + 1} 월`}</Typography>
                    <Box sx={{width:"5vw"}}/>
                    <Typography variant="h6">{`${nextDate.getFullYear()} 년 ${nextDate.getMonth() + 1} 월`}</Typography>
                    {((date.getFullYear() < new Date().getFullYear())
                        || (date.getMonth() - new Date().getMonth() < 3) )?
                        <ArrowForwardIcon sx={{width:"2vw"}}
                                          onClick={()=>{
                                              setDate(new Date(
                                                  date.getFullYear(),
                                                  date.getMonth()+1))

                                          }}/>
                        :  <Box sx={{width:"2vw"}}/>
                    }
                </Box>
                <Box sx={{height: "1rem" }}/>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width:"45vw",
                }}>
                    <CalendarToolbar />
                    <CalendarToolbar />
                </Box>
                <Box sx={{height: "0.5rem" }}/>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width:"45vw",
                }}>

                    <Box sx={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        alignItems: "center",
                        height:"12rem",
                        "& .MuiTypography-root" : {
                            display:"none"
                        },
                        "& .MuiButtonBase-root" : {
                            m: 0,
                            p: 0,
                            width:"3.5rem",
                            height:"3.5rem",
                            fontSize: "1.3rem",
                            backgroundColor: "transparent",
                        },
                        "& .PrivatePickersSlideTransition-root" : {
                            minHeight: 0
                        },
                        "& .MuiPickersDay-root" : {
                            m: 0,
                            p: 0,
                            width:"3.5rem",
                            height:"3.5rem",
                            fontSize: "1.3rem",
                            backgroundColor: "transparent",
                        }
                    }}>
                        <DayPicker
                            date={date}
                            currentMonth={date}
                            focusedDay={date}
                            isDateDisabled={() => false}
                            isMonthSwitchingAnimating={false}
                            reduceAnimations
                            onMonthSwitchingAnimationEnd={() => {}}
                            onFocusedDayChange={() => {}}
                            slideDirection="right"
                            onChange={(_date) => {
                                if(_date){
                                    setDate(_date)
                                    setSubDate(_date)
                                }
                            }}
                            renderDay={renderWeekPickerDay}
                        />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        alignItems: "center",
                        height:"12rem",
                        "& .MuiTypography-root" : {
                            display:"none"
                        },
                        "& .MuiButtonBase-root" : {
                            m: 0,
                            p: 0,
                            width:"3.5rem",
                            height:"3.5rem",
                            fontSize: "1.3rem",
                            backgroundColor: "transparent",
                        },
                        "& .PrivatePickersSlideTransition-root" : {
                            minHeight: 0
                        },
                        "& .MuiPickersDay-root" : {
                            m: 0,
                            p: 0,
                            width:"3.5rem",
                            height:"3.5rem",
                            fontSize: "1.3rem",
                            backgroundColor: "transparent",
                        }
                    }}>
                        <DayPicker
                            date={nextDate}
                            currentMonth={nextDate}
                            focusedDay={nextDate}
                            isDateDisabled={() => false}
                            isMonthSwitchingAnimating={false}
                            reduceAnimations
                            onMonthSwitchingAnimationEnd={() => {}}
                            onFocusedDayChange={() => {}}
                            slideDirection="left"
                            onChange={(_date) => {
                                if(_date){setSubDate(_date)}
                            }}
                            renderDay={renderWeekPickerDay}
                        />
                    </Box>

                </Box>
                <Box sx={{height: "7rem" }}/>
                <Button
                    variant="outlined"
                    onClick={ () => {
                        setDate(new Date())
                    }}
                    sx={{
                        alignSelf:"end",
                        fontSize:"1.2rem",
                    }}
                >날짜 지우기</Button>
                <Box sx={{height: "1rem" }}/>
            </Box>
        </LocalizationProvider>

    );
}


const CalendarToolbar =  () => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", m: 0, width:"3.5rem", height:"3.5rem", fontSize: "1.3rem",}}>
                일</Box>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", m: 0, width:"3.5rem", height:"3.5rem", fontSize: "1.3rem",}}>
                월</Box>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", m: 0, width:"3.5rem", height:"3.5rem", fontSize: "1.3rem",}}>
                화</Box>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", m: 0, width:"3.5rem", height:"3.5rem", fontSize: "1.3rem",}}>
                수</Box>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", m: 0, width:"3.5rem", height:"3.5rem", fontSize: "1.3rem",}}>
                목</Box>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", m: 0, width:"3.5rem", height:"3.5rem", fontSize: "1.3rem",}}>
                금</Box>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", m: 0, width:"3.5rem", height:"3.5rem", fontSize: "1.3rem",}}>
                토</Box>
        </Box>
    )
}


export default Calender;