import {TentItem} from "../model/TentItem";
import axios from "axios";


export const getAllTentItems: (token?: string) => Promise<TentItem[]> = (token) => {
    return axios.get("/project/tents", token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const postTentItem: (newTentItem: TentItem, token?: string) => Promise<TentItem> = (newTentItem, token) => {
    return axios.post("/project/tents", newTentItem, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}