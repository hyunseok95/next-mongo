import {createReducer} from "lib/store/reducer";

export const {
    patch: patchNavbar,
    put: putNavbar,
    putDefault: putDefaultNavbar,
    reducer: NavbarReducer
} = createReducer('navbar', {
        navbar: {
            state: "default",
            search: false
        }
    }
)

