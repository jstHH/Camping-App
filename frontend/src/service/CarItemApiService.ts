import {CarItem} from "../model/CarItem";
import axios from "axios";


export const getAllCarItems: (token?: string) => Promise<CarItem[]> = (token) => {
    return axios.get("/project/cars", token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const getCarItembyID: (id: string, token?: string) => Promise<CarItem> = (id, token) => {
    return axios.get(`/project/cars/${id}`, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const postCarItem: (newCarItem: CarItem, token?: string) => Promise<CarItem> = (newCarItem, token) => {
    return axios.post("/project/cars", newCarItem, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const putCarItem: (changedCarItem: CarItem, token?: string) => Promise<CarItem> = (changedCarItem, token) => {
    return axios.put("/project/cars/" + changedCarItem.id, changedCarItem, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}