import {createReducer} from "lib/store/reducer";

export const {
    patch: patchDialog,
    put: putDialog,
    putDefault: putDefaultDialog,
    reducer: DialogReducer
} = createReducer('dialog', {
        dialog: {
            onDialog: false,
            title: "",
            content: "",
            handleAgree: null
        }
    }
)

