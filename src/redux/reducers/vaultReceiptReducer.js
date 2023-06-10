import { ActionType } from "../constant/action-type";

export const FILES_DATA = {
    filesDatas :[]
}

const vaultReceiptReducer = (state = FILES_DATA, {type, payload}) => {
    switch(type) {
        case ActionType.GET_VAULT_RECEIPT:
            return {...state, filesDatas: payload}

        case ActionType.DOWNLOAD_VAULT_RECEIPT:
            return {...state, filesDatas: payload}


        case ActionType.DELETE_VAULT_RECEIPT:
            return {...state}
        
        default:
            return state; 

    }
}

export default vaultReceiptReducer;
