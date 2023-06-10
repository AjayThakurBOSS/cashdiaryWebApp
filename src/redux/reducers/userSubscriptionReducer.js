import { ActionType } from "../constant/action-type";

export const USER_SUBSCRIPTION_STATE = {
    userSubscription : []
}

const userSubscriptionReducer =  (state= USER_SUBSCRIPTION_STATE, {type, payload}) => {
    switch(type){
        case ActionType.GET_USERSUBSCRIPTION:
            return {...state, userSubscription: payload}

        default: 
            return state;
    }
}

export default userSubscriptionReducer;