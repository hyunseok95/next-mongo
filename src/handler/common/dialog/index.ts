import {putDialog} from "state/common/dialog";

export function handleDialog(dispatch: any, title: string, content: string, handle: any) {
    dispatch(putDialog({
        onDialog: true,
        title: title,
        content: content,
        handleAgree: handle
    }))
}
