import axios from 'axios';
// import * as https from 'https';

export const baseURL = process.env.REACT_APP_BACKEND_URL
let headers = {};
console.log("baseurl",baseURL);
if(localStorage.token){
  headers  = {
    "X-CASHDAIRY-HEADER":"cashdairy",
    "Content-type": "application/json; x-api-version=1.0",
    "Authorization":`Bearer ${localStorage.token}`
  };
}
else{
  headers  = {
    "X-CASHDAIRY-HEADER":"cashdairy",
    "Content-type": "application/json; x-api-version=1.0",
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  };
}

export default axios.create({
  // httpsAgent: new https.Agent({  
  //   rejectUnauthorized: false
  // }),
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
    }
   // headers,    
  });
