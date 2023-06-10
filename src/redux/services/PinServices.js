import axios from "axios";
import { AUTH_HEADERS } from "../../api/endpoints";


export function createPin(postData){
    return axios.post(
        `http://103.150.136.244/api/Pin`,
        postData,
        { headers: { ...AUTH_HEADERS} }
    )
}