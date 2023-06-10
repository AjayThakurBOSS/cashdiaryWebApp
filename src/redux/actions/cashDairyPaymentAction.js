import axios from "axios";
import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS } from "../../api/endpoints";
import { BASE } from "../../api/endpoints";

export const fetchCashDairyPayments = (id) => {
    return (dispatch) => {
        axios.get( BASE + `/CashTrackingPayment/GetByTrackingId/${id}`,
        { headers: { ...AUTH_HEADERS } },
        )
        .then((response) => {
            const paymentResponse = response.data
            console.log("paymentResponse", paymentResponse)

        dispatch({
            type: ActionType.GET_CASHDAIRYPAYMENT_EACH_ID,
            payload: paymentResponse
        })

        })
    }
}