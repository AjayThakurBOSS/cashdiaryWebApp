import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS } from "../../api/endpoints";
import axios from "axios";
import { BASE } from "../../api/endpoints";


export const fetchEachTransactionData = (id) => {
    console.log('Id in Transaction:-', id) 
    return (dispatch) => {
        axios.get( BASE + `/DailyCashTransactions/${id}`, 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((respEachTransaction) => {
            const EachTransactionResponse = respEachTransaction.data;
            console.log('Retail Cash Response', EachTransactionResponse )
            dispatch({
                type: ActionType.GET_EACH_TRANSACTION,
                payload: EachTransactionResponse,
            })
        })
    } 
}

export const fetchEachTransactionDataBWDates = (fromDate, toDate, id) =>{
    return (dispatch) => {
        axios.get(BASE + `/DailyCashTransactions?daillycashid=${id}&fromDate=${fromDate}&toDate=${toDate} `,
        { headers: { ...AUTH_HEADERS } },
        )
        .then((resp) => {
            const EachTransactionResponseBwDates = resp.data;
            dispatch({
                type:ActionType.GET_EACH_TRANSACTION_BW_DATES,
                payload:EachTransactionResponseBwDates,
            })
        })
    }
} 