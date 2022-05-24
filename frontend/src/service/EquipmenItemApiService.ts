import {EquipmentItem} from "../model/EquipmentItem";
import axios from "axios";


export const getAllEquipmentItems: (token?: string) => Promise<EquipmentItem[]> = (token) => {
    return axios.get("/project/equipment", token ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const postEquipmentItem: (newEquipmentItem: Omit<EquipmentItem, "id">, token?: string) => Promise<EquipmentItem> = (newEquipmentItem, token) => {
    return axios.post("/project/equipment", newEquipmentItem, token ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}