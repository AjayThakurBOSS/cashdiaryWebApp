import { ActionType } from "../constant/action-type";
import realEstateReducer from "./realEstateReducer";
export const RETAILS_CASH_DATA ={
    retailsCases: []
}

const retailCashReducer = (state = RETAILS_CASH_DATA, {type, payload}) => {
    switch(type){
        case ActionType.GET_RETAILSCASH:
            return {...state, retailsCases:payload}

        case ActionType.DELETE_RETAILCASH:
            return {...state}

        default: 
            return state;

    }
}

export default retailCashReducer