import { outputUrlStates } from "../atoms/outputUrlStates";
import {selector} from "recoil"

export const shortUrlState = selector({
    key:'shortUrlState',
    get:({get})=>{
            const state = get(outputUrlStates)
            return state.shortUrl;
        }
})