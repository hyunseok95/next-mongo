import {putAlert} from "state/common/alert";

export function handleAlert(dispatch:any, content:string, config:string){
    dispatch(putAlert({
        onAlert: true,
        content: content,
        config: config,
    }))
};
