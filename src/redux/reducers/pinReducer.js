import { ActionType } from "../constant/action-type";

export const PIN_STATE = {
    pins : []
}

const pinReducer = (state = PIN_STATE, {type, payload}) =>{
    switch(type) {
        case ActionType.FETCH_PIN:
            return {...state, pins: payload}

        case ActionType.DELETE_PIN:
            return {...state}; 

        case ActionType.UPDATE_PIN:
            return {...state, pins: payload} 
                   
        default : 
            return state;  
    }
}

export default pinReducer  