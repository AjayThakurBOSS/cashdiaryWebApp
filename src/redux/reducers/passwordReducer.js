
import { ActionType } from '../constant/action-type'


export const PASSWORD_STATE ={
   passwords:[
    { 
        name : " ",
        url : " ",
        loginId : " ",
        password : " ",
        lastUpdated: " "
    }
   ]
  
  }
   const passwordReducer = (state = PASSWORD_STATE, {type, payload}) =>{
    switch(type){
      case ActionType.FETCH_PASSWORD_DATA: 
        return {...state, passwords:payload}

    case ActionType.POST_PASSWORD_DATA:
         return {...state, passwords:payload}
    
    case ActionType.UPDATE_PASSWORD_DATA:
      return {...state, passwords:payload}
    
    case ActionType.REMOVE_PASSWORD_DATA: 
          return {...state}
  
      default :
        return state 
    }
  }
  export default passwordReducer