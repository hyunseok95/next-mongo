import axios from "axios";
import {patchListPage} from "state/page/list";
import {getPayloadProps} from "lib/store/reducer";

export async function getRoomList(state:RootState, dispatch:any, router:any){
    try {
        await axios(`api/room`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            params: {
                latitude: state.map.lat,
                longitude: state.map.lng,
                page: state.page
            }
        }).then(response => {
            dispatch(patchListPage(getPayloadProps(
                    "list", response.data
                )
            ))
        }, reason => {
            dispatch(patchListPage(getPayloadProps(
                    "no_list", "결과가 존재 하지 않습니다."
                )
            ))
        })
    } catch (e) {}
}