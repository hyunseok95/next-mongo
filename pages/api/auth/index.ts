import {serialize} from "cookie";
import axios from "axios";
import {BACK_API} from "lib/env";
import nextServerApiHandler from "lib/server";

nextServerApiHandler.get("/api/auth", async (
    req,
    res
) => {
    try {
        if(!req.session) {
            console.log("11. auth 세션 연결 실패")
            return res.status(406).json({
                message: "Unable to connect to client session"
            })
        }

        if(req.session["access-token"] && req.session["refresh-token"]) {
            console.log("11. auth 세션 연결 성공")
            const _accessToken = req.session["access-token"]
            const _refreshToken = req.session["refresh-token"]

            await axios(`${BACK_API}/auth`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${_accessToken}`
                },
                data: JSON.stringify({
                    refreshToken: _refreshToken
                })
            }).then(response => {
                res.setHeader('Set-Cookie',
                    serialize("access-token", _refreshToken,{
                        httpOnly: true
                    }))
                res.status(response.status).json(response.data)
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
        }else {
            res.status(404).json({
                errors:{
                    message: "Unable to connect to server."
                }
            })
        }
    } catch (e) {
        res.status(404).json({
            errors:{
                message: "Unable to connect to server."
            }
        })
    }
})

export default nextServerApiHandler;
