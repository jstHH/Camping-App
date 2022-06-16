import {useContext, useEffect, useState} from "react";
import {EquipmentItem} from "../model/EquipmentItem";
import {
    deleteEquipmentItem,
    getAllEquipmentItems,
    postEquipmentItem,
    putEquipmentItem
} from "../service/EquipmenItemApiService";
import {AuthContext} from "../context/AuthProvider";
import {toast} from "react-hot-toast";


export default function useEquipmentItems(getUpdatedSpending: (id: string) => void) {
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
            .then(() => toast.success("Neue Ausrüstung hinzugefügt"))
            .catch(() => toast.error("Das hat nicht geklappt!"))
    }

    const updateEquipmentItem = (changedEquipmentItem: EquipmentItem) => {
         putEquipmentItem(changedEquipmentItem, token)
            .then(response => {
                setEquipmentItems(equipmentItems.map(item => item.id === response.id ? response:item))
                getUpdatedSpending(response.spending)
                toast.success("Ausrüstung gespeichert")
            })
            .catch(() => toast.error("Das hat nicht geklappt!"))
    }

    const removeEquipmentItem = (equipmentItemID: string) => {
        deleteEquipmentItem(equipmentItemID, token)
            .then(response => response === equipmentItemID && setEquipmentItems(equipmentItems.filter(item => item.id !== response)))
            .then(() => toast.success("Ausrüstung gelöscht"))
            .catch(() => toast.error("Das hat nicht geklappt!"))
    }



    return {equipmentItems, addEquipmentItem, updateEquipmentItem, removeEquipmentItem};
}