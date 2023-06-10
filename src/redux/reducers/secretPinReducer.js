import { ActionType } from "../constant/action-type";

export const SECRET_PIN_STATE ={
    secretPin : []
}

const secretPinReducer = (state = SECRET_PIN_STATE, {type, payload})=> {
    switch(type) {
        case ActionType.GET_SECRETPIN:
            return {...state, secretPin: payload}

        case ActionType.UPDATE_SECRETPIN:
            return {...state, secretPin: payload}
            
        default : 
            return state
        
    }
}

export default secretPinReducer