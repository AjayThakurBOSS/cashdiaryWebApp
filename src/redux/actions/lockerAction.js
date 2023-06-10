import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS } from "../../api/endpoints";
import axios from "axios";
import { BASE } from "../../api/endpoints";


export const fetchLockerData = () => {
    return (dispatch) => {
        axios.get(BASE + `/Locker`, 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseLocker) => {
            const lockerResponse = responseLocker.data;
            console.log('Locker Response', lockerResponse);

            dispatch({
                type: ActionType.FETCH_LOCKER,
                payload: lockerResponse,
            })
        })
    }
}

export const deleteLockerAction =(id) => {
    console.log(id)
    return (dispatch) => {
        axios.delete(BASE + `/Locker/${id}`, 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responsePin) => {
            const pinResponse = responsePin;
          dispatch({
                type: ActionType.DELETE_LOCKER,
                payload: pinResponse,
            })
        })
    }
}

export const updateLockerAction =(id, updateLocker) => {
    console.log(id, updateLocker)
    return (dispatch) => {
        axios.put( BASE + `/Locker/${id}`,
        {...updateLocker}, 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responsePin) => {
            const pinResponse = responsePin;
          dispatch({
                type: ActionType.UPDATE_LOCKER,
                payload: {...updateLocker},
            })
        })
    }
}