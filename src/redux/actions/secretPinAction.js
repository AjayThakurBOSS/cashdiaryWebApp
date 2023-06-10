import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS, PASSWORD_LOCKER } from "../../api/endpoints";
import axios from "axios";
import { BASE } from "../../api/endpoints";

export const fetchSecretPinData = () => {
    return  (dispatch)  => {
    axios.get(BASE + '/UserProfile',
         { headers: { ...AUTH_HEADERS } },
         )
         .then((respSecretPin) => {
           const  secretPinResponse = respSecretPin.data
           console.log('Secret Pin Response', secretPinResponse.data)
         
         dispatch({
            type: ActionType.GET_SECRETPIN,
            payload: secretPinResponse,
         })

        })   
    } 
} 

export const updateSecretPinData = (id, updateSecretPin) => {
  console.log(id, updateSecretPin)
  return (dispatch) => {
 
    axios.put(BASE +  `/UserProfile/${id}`,
    {
      ...updateSecretPin,
    },
    { headers: { ...AUTH_HEADERS } },
    )
    .then((resp) => {
      
      const response= resp.data;
      console.log("SecretPin Put ressponse-",response)
      dispatch({
        type: ActionType.UPDATE_SECRETPIN,
        payload:  {
          ...updateSecretPin,
        },
      }) 
      
    })
  }
}