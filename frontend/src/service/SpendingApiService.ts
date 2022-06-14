import axios from "axios";
import {Spending} from "../model/Spending";
import {SpendingItemDTO} from "../model/SpendinItemDTO";


export const getAllSpendings: (token?: string) => Promise<Spending[]> = (token) => {
    return axios.get("/project/spendings", token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const postSpending: (newSpending: SpendingItemDTO, token?: string) => Promise<Spending> = (newSpending, token) => {
    return axios.post("/project/spendings", newSpending, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const getSpendingByID: (id: string, token?: string) => Promise<Spending> = (id, token) =>{
    return axios.get("/project/spendings/" + id, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}