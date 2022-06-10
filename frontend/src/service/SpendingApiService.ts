import axios from "axios";
import {Spending} from "../model/Spending";


export const getAllSpendings: (token?: string) => Promise<Spending[]> = (token) => {
    return axios.get("/project/spendings", token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}