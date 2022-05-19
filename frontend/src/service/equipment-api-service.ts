import {EquipmentItem} from "../model/EquipmentItem";
import axios from "axios";


export const getAllEquipmentItems: () => Promise<EquipmentItem[]> = () => {
    return axios.get("/project/equipment")
        .then(response => response.data)
}