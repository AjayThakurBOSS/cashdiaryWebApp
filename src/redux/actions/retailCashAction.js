import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS } from "../../api/endpoints";
import axios from "axios";
import { BASE } from "../../api/endpoints";

export const fetchRetailCashdata = () => {
    return (dispatch) => {
        axios.get(BASE + '/DailyCash', 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseRetailsCash) => {
            const retailsCashResponse = responseRetailsCash.data;

            console.log('Retail Cash Response', retailsCashResponse )

            dispatch({
                type: ActionType.GET_RETAILSCASH,
                payload: retailsCashResponse,
            })
        })
    }
}


export const deleteRetailCashdata = (id) => {
    console.log(id)
    return (dispatch) => {
        axios.delete( BASE + `/DailyCash/${id}`,
        { headers: { ...AUTH_HEADERS } },
        ).then((respData) => {
            const retailCashResponse = respData.data;

            dispatch({
                type: ActionType.DELETE_RETAILCASH,
                payload:retailCashResponse,

            })
        } )
    }
}