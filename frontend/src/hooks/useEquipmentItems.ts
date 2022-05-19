import {useEffect, useState} from "react";
import {EquipmentItem} from "../model/EquipmentItem";
import {getAllEquipmentItems} from "../service/equipment-api-service";


export default function useEquipmentItems() {
    const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>([])


    useEffect(() => {
        getAllEquipmentItems()
            .then(response => setEquipmentItems(response) )
            .catch(console.log)
    },[])

    return equipmentItems;
}