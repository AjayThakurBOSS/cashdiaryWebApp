import axios from "axios";
import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS } from "../../api/endpoints";
import { BASE } from "../../api/endpoints";

export const fetchEachCashDairyData =(id) => {
    return (dispatch) => {
        axios.get( BASE + `/CashTrackingLoan/GetByCashTrackingId/${id}`,
        { headers: { ...AUTH_HEADERS } },
        ).then((response) => {
            const eachCashDairyResponse = response.data
            console.log(eachCashDairyResponse)

            dispatch({
                type:ActionType.GET_EACH_CASHDAIRYDATA,
                payload: eachCashDairyResponse,
            })
        })
    }
 }