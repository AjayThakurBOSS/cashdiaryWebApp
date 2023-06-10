import { ActionType } from "../constant/action-type";

export const EACH_TRANSACTION = {
    transactions: []
}

const eachTransactionReducer = (state= EACH_TRANSACTION, {type, payload}) => {
    switch(type){
        case ActionType.GET_EACH_TRANSACTION:
            return {...state, transactions : payload}
        
        case ActionType.POST_EACH_TRANSACTION:
            return {...state, transactions: payload}

        case ActionType.GET_EACH_TRANSACTION_BW_DATES:
            return {...state, transactions: payload}

        default:
            return state
    }
}

export default eachTransactionReducer;