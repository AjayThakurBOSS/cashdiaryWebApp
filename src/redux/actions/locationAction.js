import axios from "axios";
import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS } from "../../api/endpoints";
import { BASE } from "../../api/endpoints";


export const fetchLocationData =() => {
    return (dispatch) => {
        axios.get( BASE + `/Location`,
        { headers: { ...AUTH_HEADERS } },
        ).then((response) => {
            const LocationResponse = response.data
            console.log(LocationResponse)

            dispatch({
                type:ActionType.GET_LOCATION,
                payload: LocationResponse,
            })
        })
    }
 }

 export const deleteLocationAction =(id) => {
    console.log(id)
    return (dispatch) => {
        axios.delete(BASE + `/Location/${id}`, 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responsePin) => {
          dispatch({
                type: ActionType.DELETE_LOCATION,
               
            })
        })
    }
}