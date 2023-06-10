import { ActionType } from "../constant/action-type";


const LOAN_PAYMENT_STORE = {
    allPaymentforeachId :[]
}

const eachCashDairyPaymentReducer = (state = LOAN_PAYMENT_STORE, {type, payload}) => {
    switch(type) {
        case ActionType.GET_CASHDAIRYPAYMENT_EACH_ID:
            return {...state, allPaymentforeachId: payload}
    
        default:
            return state
    }
}

export default eachCashDairyPaymentReducer;