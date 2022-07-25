import {BACK_API} from "lib/env";
import nextServerApiHandler from "lib/server";
import axios from "axios";

nextServerApiHandler.get("/api/room/info",async (
    req,
    res,
) => {
    try {
        await axios(`${BACK_API}/room/info`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            params: req.query,
        }).then(response => {
            res.status(response.status).json(response.data)
        }, reason => {
            if (reason.response) {
                res.status(reason.response.status).json(reason.response.data)
            }else {
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



