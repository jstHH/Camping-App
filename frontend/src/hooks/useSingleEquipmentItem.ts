import {useContext, useState} from "react";
import {EquipmentItem} from "../model/EquipmentItem";
import {AuthContext} from "../context/AuthProvider";
import {getEquipmentItemByID} from "../service/EquipmenItemApiService";


export default function useSingleEquipmentItem() {
    const [equipmentItem, setEquipmentItem] = useState<EquipmentItem>()
    const {token} = useContext(AuthContext)

    const getSingleEquipmentItemByID = (id: string) => {
        getEquipmentItemByID(id,token)
            .then(response => setEquipmentItem(response))
            .catch(console.error)
    }

    return {equipmentItem, getSingleEquipmentItemByID, setEquipmentItem}
}