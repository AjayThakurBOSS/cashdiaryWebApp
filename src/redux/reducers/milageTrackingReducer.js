import { ActionType } from "../constant/action-type";

export const  MILAGETRACKING_STATE ={
    milagetrackings:[],
    searchMilage : []
}

const milagetrackingReducer = (state=MILAGETRACKING_STATE, {type, payload}) => {
    switch(type) {
        case ActionType.GET_MILAGETRACKING:
            return {...state, milagetrackings: payload}

        case ActionType.GET_MILAGETRACKING_BW_DATES:
            return {...state, milagetrackings: payload}

        case ActionType.DELETE_MILAGE_TRACKING:
            return {...state}

        case ActionType.UPDATE_MILAGE_TRACKING:
            return {...state, milagetrackings: payload}
            
        default :
            return state  
    }
}

export default milagetrackingReducer;