import {Reducer} from "redux";
import {ActionWithPayload, PayloadWithKey} from "lib/store/reducer";
import produce from "immer";

type InitState<Key extends string> = Record<Key, any>

function mapToReducer<
    Key extends string,
    State extends InitState<Key>>
(
    initialState: State,
    handlerMap: Record<string, Function>
):Reducer<State, ActionWithPayload> {
    return function (
        state: State | undefined = initialState,
        action
    ): State {
        return produce(
            state,
            (draft) => {
                const handler = handlerMap[action.type];
                if (handler) handler(draft, action);
            })
    }
}

export function createReducer<
    Key extends string,
    State extends InitState<Key>>
(
    key: Key,
    initialState: State
){
    const PATCH = `PATCH_${key.toUpperCase()}`;
    const patch = (payload: PayloadWithKey) =>({type: PATCH, payload});

    const PATCH_ARRAY = `PATCH_ARRAY_${key.toUpperCase()}`;
    const patchArray = (payload: PayloadWithKey) =>({type: PATCH_ARRAY, payload});

    const PUT = `PUT_${key.toUpperCase()}`;
    const put = (payload: Record<string, any>) =>({type: PUT, payload});

    const PUT_DEFAULT = `PUT_DEFAULT_${key.toUpperCase()}`;
    const putDefault = () => ({type: PUT_DEFAULT});

    const reducer = mapToReducer<Key, State>(initialState, {
        [PATCH]: (state: State, action: ActionWithPayload<PayloadWithKey>) =>
            state[key][action.payload.key] = action.payload.value
        ,
        [PATCH_ARRAY]: (state: State, action: ActionWithPayload<PayloadWithKey>) =>
            state[key].map((item: any) =>
                item.hasOwnProperty(action.payload.key) ? {...item, item: action.payload.value} : item)
        ,
        [PUT]: (state: State, action: ActionWithPayload) =>
            state[key] = action.payload
        ,
        [PUT_DEFAULT]: (state: State, action: ActionWithPayload) =>
            state[key] = initialState[key]
    })

    return {
        PATCH, PUT, PUT_DEFAULT, PATCH_ARRAY,
        patch, put, putDefault, patchArray,
        reducer
    }
}

