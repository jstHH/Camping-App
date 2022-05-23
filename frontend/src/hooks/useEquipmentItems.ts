import {useContext, useEffect, useState} from "react";
import {EquipmentItem} from "../model/EquipmentItem";
import {getAllEquipmentItems} from "../service/EquipmenItemApiService";
import {AuthContext} from "../context/AuthProvider";


export default function useEquipmentItems() {
    const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>([])
    const {token} = useContext(AuthContext)


    useEffect(() => {
        getAllEquipmentItems(token)
            .then(response => setEquipmentItems(response) )
            .catch(console.log)
    },[token])

    return equipmentItems;
}