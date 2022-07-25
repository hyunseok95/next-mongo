import {getPayloadProps} from "lib/store/reducer";
import {patchRoomPage} from "state/page/room";
import axios from "axios";

export async function getRoomInfo(id: number, dispatch:any){
    try {
        await axios(`api/room/info`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            params: {
                roomId: id
            }
        }).then(response => {
            dispatch(patchRoomPage(getPayloadProps(
                    "roomInfo", response.data
                )
            ))
        }, reason => {});
    } catch (e) {}
}