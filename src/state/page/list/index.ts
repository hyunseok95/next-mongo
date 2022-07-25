import {createReducer} from "lib/store/reducer";

export const {
    patch: patchListPage ,
    put: putListPage,
    putDefault:  putDefaultListPage,
    reducer: ListPageReducer
} = createReducer('list_page', {
    list_page: {
        map: {
            lat: null,
            lng: null
        },
        page: null,
        list: null,
        no_list: "결과를 기다리는 중입니다.",
        googleMap: null,
    }
})

