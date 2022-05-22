import {EquipmentItem} from "../model/EquipmentItem";
import axios from "axios";


export const getAllEquipmentItems: (token?: string) => Promise<EquipmentItem[]> = (token) => {
    return axios.get("/project/equipment", token ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}