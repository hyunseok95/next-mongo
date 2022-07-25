import cookie from "cookie";
import {Store} from "redux";
import {GetServerSidePropsContext} from "next/types";
import axios from "axios";
import {putToken} from "state/common/token";

export async function getStayLogin(store: Store, context: GetServerSidePropsContext){
    try{
        const _cookie = context.req.headers.cookie
        const parsedCookies = _cookie? cookie.parse(_cookie) : {}
        const sidValue = parsedCookies["sid"]

        if(sidValue){
            await axios(`http://${context.req.headers.host}/api/auth`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    cookie: `sid=${sidValue}`,
                }
            }).then( response => {
                const _cookie = response.headers['set-cookie']
                if (_cookie) {
                    const _accessToken = cookie.parse(_cookie[0])["access-token"]
                    store.dispatch(putToken({
                        accessToken: _accessToken,
                        isLogin:true
                    }))
                }
            })
        }
    } catch (e) {}
}

