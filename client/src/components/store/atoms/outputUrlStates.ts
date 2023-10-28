import {atom} from "recoil"

export const outputUrlStates = atom({
    key: "outputUrlState",
    default:{
        isCopied:false,
        shortUrl:''
    }
})