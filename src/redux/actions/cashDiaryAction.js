 import { ActionType } from "../constant/action-type";
 import { AUTH_HEADERS } from "../../api/endpoints";
 import axios from "axios";
 import { BASE } from "../../api/endpoints";

 export const fetchCashDiaryData =() => {
    return (dispatch) => {
        axios.get( BASE + `/CashTracking`,
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseCashDiary) => {
            const cashDiaryResponse = responseCashDiary.data;
            console.log("Cash Diary Names-",cashDiaryResponse)
            dispatch({
                type:ActionType.GET_CASHDIARY,
                payload: cashDiaryResponse,
            })
        })
    }
 }

 export const deleteCashDiaryData = (id) => {
    return (dispatch) => {
        axios.delete( BASE + `/CashTracking/${id}`,
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseCashDiary) => {
            const cashDiaryResponse = responseCashDiary.data;
            console.log("Cash Diary Names-",cashDiaryResponse)
            dispatch({
                type:ActionType.DELETE_CASHDIARY,
                
            })
        })
    }
 }

