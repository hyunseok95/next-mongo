import {Action} from "redux";

export * from './create-reducer';
export * from './merge-reducer';

export type PayloadWithKey = {
    key: string | number,
    value: any,
}

export interface ActionWithPayload<T = any> extends Action{
    type: string,
    payload: T
}

export function getPayloadProps (key: string | number, value: any): PayloadWithKey{
    return {
        key: key,
        value: value
    }
}



