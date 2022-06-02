import {CarItem} from "../model/CarItem";
import axios from "axios";


export const getAllCarItems: (token?: string) => Promise<CarItem[]> = (token) => {
    return axios.get("/project/cars", token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const postCarItem: (newCarItem: CarItem, token?: string) => Promise<CarItem> = (newCarItem, token) => {
    return axios.post("/project/cars", newCarItem, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}