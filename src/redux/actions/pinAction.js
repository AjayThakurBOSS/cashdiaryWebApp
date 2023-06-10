import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS } from "../../api/endpoints";
import axios from "axios";
import { BASE } from "../../api/endpoints";


export const fetchPindata = () => {
    return  (dispatch) => {
        axios.get( BASE + '/Pin', 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responsePin) => {
            const pinResponse = responsePin.data;
            console.log("Pin response", pinResponse);

            dispatch({
                type: ActionType.FETCH_PIN,
                payload: pinResponse,
            })
        })
    }
}

export const deletePinAction =(id) => {
    
    return (dispatch) => {
        axios.delete( BASE + `/Pin/${id}`, 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responsePin) => {
            const pinResponse = responsePin;
            console.log('Pin Delete Response:', pinResponse)
          dispatch({
                type: ActionType.DELETE_PIN,
                payload: pinResponse, 
            })
        })
    }
}

export const updatePinAction = (id, updatePin) => {
    console.log(id, updatePin )
    return (dispatch) => {
        axios.put(BASE + `/Pin/${id}`,
        {...updatePin},
        { headers: { ...AUTH_HEADERS } },
        )
        .then((res) => {
            console.log(res);

            dispatch({
                type: ActionType.UPDATE_PIN,
                payload:{...updatePin} ,
            })
        })
    }
}



