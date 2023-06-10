import axios from "axios"
import { ActionType } from "../constant/action-type"
import { AUTH_HEADERS } from "../../api/endpoints"
import { BASE } from "../../api/endpoints"

export const fetchVaultReceiptData = () => {
    return (dispatch) => {
        axios.get( BASE + '/UserFiles', 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseVaultData) => {
            const vaultreceiptResponse = responseVaultData.data;
            console.log("vaultreceipt Response:-", vaultreceiptResponse)
            dispatch({
                type:ActionType.GET_VAULT_RECEIPT,
                payload: vaultreceiptResponse,
            })
        })
    }
}

export const downloadVaultReceiptData= (id) => {
    console.log(id)
    return (dispatch) => {
        axios.get( BASE + `/UserFiles/${id}`,
        { headers: { ...AUTH_HEADERS } },
        ).then((respData) => {
            const dataToDownload = respData.data
            dispatch({
                type: ActionType.DELETE_VAULT_RECEIPT,
                payload: dataToDownload,
            })
        } )
    }
}

export const deleteVaultReceiptData= (id) => {
    console.log(id)
    return (dispatch) => {
        axios.delete( BASE + `/UserFiles/${id}`,
        { headers: { ...AUTH_HEADERS } },
        ).then((respData) => {
            dispatch({
                type: ActionType.DELETE_VAULT_RECEIPT,
                
            }) 
        } )
    }
}