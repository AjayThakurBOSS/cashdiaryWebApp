import { ActionType } from "../constant/action-type";
export const REAL_ESTATE_DATA = {
    realEstate: []
}

const realEstateReducer = (state = REAL_ESTATE_DATA, {type, payload}) => {
    switch(type){
        case ActionType.GET_REALESTATE:
            return {...state, realEstate: payload }

        case ActionType.DELETE_REALESTATE:
            return {...state }

        case ActionType.UPDATE_REALESTATE:
            return {...state, realEstate: payload }
            
        default:
            return state;
    }
}

export default realEstateReducer; 