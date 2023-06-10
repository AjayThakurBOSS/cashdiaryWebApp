import { ActionType } from "../constant/action-type";

export const LOCKER_STATE = {
    lockers: [
       
    ] 
}

const lockerReducer = (state = LOCKER_STATE, {type, payload}) => {
    switch(type) {
        case ActionType.FETCH_LOCKER:
            return {...state, lockers: payload};

        case ActionType.DELETE_LOCKER:
            return {...state};

            case ActionType.UPDATE_LOCKER:
                return {...state, lockers: payload};
        default : 
            return state
    }
}

export default lockerReducer