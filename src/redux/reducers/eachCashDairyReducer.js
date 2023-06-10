import { ActionType } from "../constant/action-type";

export const EACH_CASHDAIRY = {
    eachCashDairy: []
}

const eachCashDairyReducer = (state= EACH_CASHDAIRY, {type, payload}) => {
    switch(type){
        case ActionType.GET_EACH_CASHDAIRYDATA:
            return {...state, eachCashDairy : payload}
    
        default:
            return state
    }
}

export default eachCashDairyReducer;