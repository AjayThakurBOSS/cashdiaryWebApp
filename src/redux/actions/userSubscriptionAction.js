import { ActionType } from "../constant/action-type";
import axios from "axios";
import { AUTH_HEADERS } from "../../api/endpoints";
import { BASE } from "../../api/endpoints";

export const fetchUserSubscriptionData = () => {
    return (dispatch) => {
        axios.get(BASE +  `/UserSubscription`,
        { headers: { ...AUTH_HEADERS } },
        )
        .then((response) => {
            const userSubscriptionResponse = response.data;
            console.log('UserSubscription Response',userSubscriptionResponse )

            dispatch({
                type: ActionType.GET_USERSUBSCRIPTION,
                payload: userSubscriptionResponse,
            })
        })
    }
}
