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

export const getSingleTentItem: (tentID: string, token?: string) => Promise<TentItem> = (tentID, token ) => {
    return axios.get("/project/tents/" + tentID, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const putTentItem: (changedTentItem: TentItem, token?: string) => Promise<TentItem> = (changedTentItem, token ) => {
    return axios.put("/project/tents/" + changedTentItem.id, changedTentItem,token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const deleteTentItem: (id: string, token?: string) => Promise<string> = (id, token) => {
    return axios.delete("/project/tents/" + id, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}
