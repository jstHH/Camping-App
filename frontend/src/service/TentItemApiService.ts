import {TentItem} from "../model/TentItem";
import axios from "axios";


export const getAllTentItems: (token?: string) => Promise<TentItem[]> = (token) => {
    return axios.get("/project/tents", token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}