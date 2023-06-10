import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS } from "../../api/endpoints";
import axios from "axios";
import { BASE } from "../../api/endpoints";

export const fetchMilageTrackingData = () => {
    return (dispatch) => {
        axios.get(BASE + '/MileageTracking',
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseMilage) => {
            const milageResponse = responseMilage.data;
            console.log("milageResponse:-",milageResponse)
            dispatch({
                type:ActionType.GET_MILAGETRACKING,
                payload: milageResponse,
            })
        })
    }
}

export const fetchMilageDataBetweenDates = (startingDate, endingDate) =>{ 
    return(dispatch) => {
        axios.get(BASE + `/MileageTracking/${startingDate}/${endingDate}`,
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseMilagebwDates) => {
            const milageResponseBwDates = responseMilagebwDates.data;
            console.log("milageResponseBwDates:-", milageResponseBwDates)

            dispatch({
                type:ActionType.GET_MILAGETRACKING_BW_DATES,
                payload:milageResponseBwDates,
            })
        }) 
    }
}

export const deleteMilageTrackingAction =(id) => {
    console.log(id)
    return (dispatch) => {
        axios.delete(BASE + `/MileageTracking/${id}`, 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responsePin) => {
          dispatch({
                type: ActionType.DELETE_MILAGE_TRACKING,
               
            })
        })
    }
}

export const updateMilageTrackingAction =(id, updateMilage) => {
    console.log(id, updateMilage)
    return (dispatch) => {
        axios.put( BASE + `/MileageTracking/${id}`,
        {...updateMilage}, 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseMilage) => {
          dispatch({
                type: ActionType.UPDATE_MILAGE_TRACKING,
                payload: {...updateMilage},
            })
        })
    }
}
