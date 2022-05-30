import {useContext, useEffect, useState} from "react";
import {EquipmentItem} from "../model/EquipmentItem";
import {getAllEquipmentItems, postEquipmentItem, putEquipmentItem} from "../service/EquipmenItemApiService";
import {AuthContext} from "../context/AuthProvider";


export default function useEquipmentItems() {
    const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>([])
    const {token} = useContext(AuthContext)


    useEffect(() => {
        getAllEquipmentItems(token)
            .then(response => setEquipmentItems(response) )
            .catch(console.log)
    },[token])

    const addEquipmentItem = (newEquipmentItem: Omit<EquipmentItem, "id">) => {
        postEquipmentItem(newEquipmentItem, token)
            .then(response => setEquipmentItems([...equipmentItems, response]))
            .catch(console.error)
    }

    const updateEquipmentItem = (changedEquipmentItem: EquipmentItem) => {
        putEquipmentItem(changedEquipmentItem, token)
            .then(response => setEquipmentItems(equipmentItems.map(item => item.id === response.id ? response:item)))
            .catch(console.error)
    }



    return {equipmentItems, addEquipmentItem, updateEquipmentItem};
}