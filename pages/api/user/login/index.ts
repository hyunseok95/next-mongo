import cookie from "cookie";
import axios from "axios";
import {BACK_API} from "lib/env";
import nextServerApiHandler from "lib/server";

nextServerApiHandler.post("/api/user/login",async (
    req,
    res
) => {
    try {
        await axios(`${BACK_API}/user/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            data:JSON.stringify(req.body)
        }).then(response => {
            if(!req.session) return  res.status(406).json({
                    errors:{
                        message: "Unable to connect to server."
                    }
                })
            const _cookie = response.headers['set-cookie']
            if (_cookie) {
                const _accessToken = cookie.parse(_cookie[0])["access-token"]
                const _refreshToken = cookie.parse(_cookie[1])["refresh-token"]
                req.session["access-token"] = _accessToken;
                req.session["refresh-token"] = _refreshToken;
                res.status(response.status).json(response.data)
            } else {
                res.status(406).json({
                    errors:{
                        message: "Unable to connect to server."
                    }
                })
            }
        }, reason => {
            if (reason.response) {
                res.status(reason.response.status).json(reason.response.data)
            } else {
                res.status(404).json({
                    errors:{
                        message: "Unable to connect to server."
                    }
                })
            }
        })
    } catch (e) {
        res.status(404).json({
            errors:{
                message: "Unable to connect to server."
            }
        })
    }
})

export default nextServerApiHandler;





