import {EquipmentItem} from "../model/EquipmentItem";
import axios from "axios";


export const getAllEquipmentItems: (token?: string) => Promise<EquipmentItem[]> = (token) => {
    return axios.get("/project/equipment", token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const getEquipmentItemByID: (id: string, token?: string) => Promise<EquipmentItem> = (id, token) => {
    return axios.get(`/project/equipment/${id}`, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const postEquipmentItem: (newEquipmentItem: Omit<EquipmentItem, "id">, token?: string) => Promise<EquipmentItem> = (newEquipmentItem, token) => {
    return axios.post("/project/equipment", newEquipmentItem, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}

export const putEquipmentItem: (changedEquipmentItem: EquipmentItem, token?: string) => Promise<EquipmentItem> = (changedEquipmentItem, token) => {
    return axios.put("/project/equipment/" + changedEquipmentItem.id, changedEquipmentItem, token
        ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}