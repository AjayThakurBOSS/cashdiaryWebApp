import { ActionType } from "../constant/action-type";

export const CLIENTS_DATA = {
    clientsdata : []
}

const vaultBusinessReducer = (state = CLIENTS_DATA, {type, payload}) => {
    switch(type) {
        case ActionType.GET_VAULT_BUSINESS:
            return {...state, clientsdata: payload}

        case ActionType.DELETE_VAULT_BUSINESS:
            return {...state}

        case ActionType.UPDATE_VAULT_BUSINESS:
            return {...state, clientsdata: payload}
        
        default:
            return state; 

    }
}

export default vaultBusinessReducer;