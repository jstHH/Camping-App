import {CarItem} from "../model/CarItem";
import axios from "axios";


export const getAllCarItems: (token?: string) => Promise<CarItem[]> = (token) => {
    return axios.get("/project/cars", token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}