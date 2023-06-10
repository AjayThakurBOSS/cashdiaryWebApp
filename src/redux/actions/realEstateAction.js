import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS } from "../../api/endpoints";
import axios from "axios";
import { BASE } from "../../api/endpoints";

export const fetchRealEstateData = () => {
    return (dispatch) => {
        axios.get( BASE + '/RealEstate',
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responseRSdata) => {
            const rstateResponse = responseRSdata.data;
            console.log('RealEstate response', rstateResponse)

            dispatch({
                type:ActionType.GET_REALESTATE,
                payload: rstateResponse,
            })
        })
    }
}

export const deleteRealEstateAction =(id) => {
    console.log(id)
    return (dispatch) => {
        axios.delete( BASE + `/RealEstate/${id}`, 
        { headers: { ...AUTH_HEADERS } },
        )
        .then((responsePin) => {
            const pinResponse = responsePin;
          dispatch({
                type: ActionType.DELETE_REALESTATE,
                payload: pinResponse,
            })
        })
    }
}

export const updateRealEstateAction = (id,updateRealEstate ) => {
    console.log(id);
    return (dispatch) => {
        axios.put(BASE + `/RealEstate/${id}`,
        {...updateRealEstate},
        { headers: { ...AUTH_HEADERS } },

        )
        .then((resp) => {
            console.log(resp.data);

            dispatch({
                type: ActionType.UPDATE_REALESTATE,
                payload: {...updateRealEstate}
            })
        })
    }
}