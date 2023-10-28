import { outputUrlStates } from "../atoms/outputUrlStates";
import {selector} from "recoil"

export const copyState = selector({
    key:"copy",
    get:({get})=>{
        const state = get(outputUrlStates);
        return state.isCopied;
    }
})