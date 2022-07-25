import {createReducer} from "lib/store/reducer";

export const {
    patch: patchRoomPage ,
    put: putRoomPage,
    putDefault:  putDefaultRoomPage,
    reducer: RoomPageReducer
} = createReducer('room_page', {
    room_page: {
        roomInfo: null
    }
})

