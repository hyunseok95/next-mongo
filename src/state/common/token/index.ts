import {createReducer} from "lib/store/reducer";

export const {
    patch: patchToken,
    put: putToken,
    putDefault: putDefaultToken,
    reducer: TokenReducer
} = createReducer(
    "token",{
        token: {
            accessToken: "",
            isLogin:false
        }
    }
)


