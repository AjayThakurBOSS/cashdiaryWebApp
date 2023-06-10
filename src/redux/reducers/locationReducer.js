import { ActionType } from "../constant/action-type";

export const LOCATIONS = {
    allLocation: []
}

const LocationReducer = (state= LOCATIONS, {type, payload}) => {
    switch(type){
        case ActionType.GET_LOCATION:
            return {...state, allLocation : payload}
    
        case ActionType.DELETE_LOCATION:
            return {...state}
        default:
            return state
    }
}

export default LocationReducer;