import axios from "axios";

export function API(url="https://5d9f7fe94d823c0014dd323d.mockapi.io/api") {
   return axios.create({
    baseURL: url
   })
}

