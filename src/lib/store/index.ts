import {createWrapper, HYDRATE, MakeStore} from "next-redux-wrapper";
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import {ActionWithPayload, mergeReducer} from "lib/store/reducer";
import {UserReducer} from "state/common/user";
import {TokenReducer} from "state/common/token";
import {AlertReducer} from "state/common/alert";
import {DialogReducer} from "state/common/dialog";
import {NavbarReducer} from "state/common/navbar";
import {ListPageReducer} from "state/page/list";
import {RoomPageReducer} from "state/page/room";
import {IS_DEV} from "lib/env";


const reducer = mergeReducer([
    ListPageReducer,
    AlertReducer,
    DialogReducer,
    NavbarReducer,
    UserReducer,
    TokenReducer,
    RoomPageReducer,
])

declare global {
    type RootState = ReturnType<typeof reducer>;
}

const rootReducer = (state: RootState | undefined, action: ActionWithPayload) => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload};
        default: {
            return reducer(state, action);
        }
    }
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const makeStore: MakeStore<any> = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
        devTools: IS_DEV,
    });
    return store;
};

export const wrapper = createWrapper<any>(makeStore, {
    debug: IS_DEV,
});

export default wrapper;