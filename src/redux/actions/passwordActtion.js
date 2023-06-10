import { ActionType } from "../constant/action-type";
import { AUTH_HEADERS, PASSWORD_LOCKER } from "../../api/endpoints";
import axios from "axios";
import { BASE } from "../../api/endpoints";



export const fetchPasswordData = () => {
    return  (dispatch)  => {
    axios.get( BASE + '/PasswordLocker',
         { headers: { ...AUTH_HEADERS } },
         )
         .then((responsePassword) => {
           const  passwordResponse = responsePassword.data
           console.log('Password Response', passwordResponse)
         
         dispatch({
            type: ActionType.FETCH_PASSWORD_DATA,
            payload: passwordResponse,
         })

        })   
    } 
} 

export const deletePasswordAction =(id) => {
  console.log(id)
  return (dispatch) => {
      axios.delete(BASE + `/PasswordLocker/${id}`, 
      { headers: { ...AUTH_HEADERS } },
      )
      .then((responsePin) => {
          const pinResponse = responsePin;
        dispatch({
              type: ActionType.REMOVE_PASSWORD_DATA,
              payload: pinResponse,
          })
      })
  }
}

export const updatePasswordAction = (id, updatePassword) => {
 
  console.log(id)
  return (dispatch) => {
    console.log('yaha tk thik hai- 1')
    axios.put( BASE + `/PasswordLocker/${id}`,
    {
      ...updatePassword,
    },
    { headers: { ...AUTH_HEADERS } },
    )
    .then((resp) => {
      
      const response= resp.data;
      console.log("Password Put ressponse-",response)
      dispatch({
        type: ActionType.UPDATE_PASSWORD_DATA,
        payload: { ...updatePassword, },
      }) 
      
    })
  }
}
