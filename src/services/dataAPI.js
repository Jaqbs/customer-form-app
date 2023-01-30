import { API } from "./API";

export function postData(data) {
    return API().post('/message', data)  
}


