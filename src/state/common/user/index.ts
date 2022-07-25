import {createReducer} from "lib/store/reducer";

export const {
    patch: patchUser,
    put: putUser,
    putDefault: putDefaultUser,
    reducer: UserReducer,
} = createReducer(
    "user",{
        user: {
            name: "",
            phone_number: "",
            email: "",
            password: "",
        }
    }
)
