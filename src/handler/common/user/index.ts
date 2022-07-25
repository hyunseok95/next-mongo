import axios from "axios";
import {putDefaultUser} from "state/common/user";
import {handleAlert} from "handler/common/alert";
import {handleDialog} from "handler/common/dialog";
import {putDefaultDialog} from "state/common/dialog";

export async function getUser(e: any, user: any, dispatch:any, router:any ) {
    e.preventDefault()
    try {
        await axios(`api/user/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            data: JSON.stringify({
                email: user.email,
                password:user.password
            })
        }).then(response => {
            new Promise((res) => {
                router.push('/');
                setTimeout(res, 1000)
            }).then(() => {
                handleAlert(dispatch,response.data.message, "success");
            })
        },reason => {
            handleAlert(dispatch,reason.response.data.errors.message, "error");
        });
    }catch (error){}
}

export async function postUser(e: any, user:RootState, dispatch:any, router:any ){
    e.preventDefault()
    const handleCreateAccount = async () => {

        try {
            await axios(`api/user`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: JSON.stringify(user)
            }).then( response => {
                router.push('/sign-in');
                dispatch(putDefaultUser());
                handleAlert(dispatch, response.data.message,"success");
            }, reason => {
                handleAlert(dispatch,reason.response.data.errors.message, "error");
            }).then(() => {
                dispatch(putDefaultDialog());
            });
        } catch (e) {}
    }
    handleDialog(dispatch,'알림','회원 가입 하시겠습니까?',handleCreateAccount)
}
