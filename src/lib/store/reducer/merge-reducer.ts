import {Action, Reducer} from "redux";

export function mergeReducer <method extends Action> (reducers: Array<Reducer<any, method>>){
    return function (state: any, action: method){
        if(!state) {
            return reducers.reduce(
                (acc, r) => ({
                    ...acc, ...r(state, action)
                }), {});
        }else{
            let nextState = state;
            for (const r of reducers){
                nextState = r(nextState, action)
            }
            return nextState;
        }
    }
}

