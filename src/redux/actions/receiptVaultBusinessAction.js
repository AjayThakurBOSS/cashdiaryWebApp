import axios from "axios"
import { ActionType } from "../constant/action-type"
import { AUTH_HEADERS } from "../../api/endpoints"
import { BASE } from "../../api/endpoints"

export const fetchVaultReceiptBusinessData = () => {
    return (dispatch) => {
        axios.get( BASE + '/UserClient', 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseClientData) => {
            const vaultClientResponse = responseClientData.data;
            console.log("vault receipt Client Response:-", vaultClientResponse)
            dispatch({
                type:ActionType.GET_VAULT_BUSINESS,
                payload: vaultClientResponse,
            })
        })
    }
}

export const deleteVaultReceiptBusinessData = (id) => {
    console.log(id)
    return (dispatch) => {
        axios.delete( BASE + `/UserClient/${id}`,
        { headers: { ...AUTH_HEADERS } },
        ).then((respData) => {
            dispatch({
                type: ActionType.DELETE_VAULT_BUSINESS,
                
            }) 
        } )
    }
}

export const updateVaultReceiptBusinessData = (id, updatedClient) => {
    console.log(id, updatedClient )
    return (dispatch) => {
        axios.put(BASE + `/UserClient/${id}`,
        {...updatedClient},
        { headers: { ...AUTH_HEADERS } },
        )
        .then((res) => {
            console.log(res);

            dispatch({
                type: ActionType.UPDATE_VAULT_BUSINESS,
                payload:{...updatedClient} ,
            })
        })
    }
}