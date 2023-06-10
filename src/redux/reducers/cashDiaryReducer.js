 import { ActionType } from "../constant/action-type";
 export const CASHDIARY_STATE ={
    cashDiaries:[]
 }

 const cashDiaryReducer = (state= CASHDIARY_STATE, {type, payload}) => {
    switch(type){
        case ActionType.GET_CASHDIARY:
            return {...state, cashDiaries: payload}
        
            case ActionType.DELETE_CASHDIARY:
                return {...state};
    
        
        default: 
            return state
    }
 }

 export default cashDiaryReducer