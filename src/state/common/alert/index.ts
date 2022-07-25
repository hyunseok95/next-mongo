import {createReducer} from "lib/store/reducer";

export const {
    patch: patchAlert,
    put: putAlert,
    putDefault: putDefaultAlert,
    reducer: AlertReducer
} = createReducer(
    "alert",{
        alert: {
            onAlert: false,
            content: "",
            config: 'error'
        }
    }
)

