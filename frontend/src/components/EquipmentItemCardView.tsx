import {EquipmentItem} from "../model/EquipmentItem";
import EquipmentItemCard from "./EquipmentItemCard";
import "./EquipmentItemCardView.css"
import {AppUser} from "../model/AppUser";

export type EquipmentItemCardViewProps = {
    equipmentItems: EquipmentItem[]
    appUsers: AppUser[]
}

export default function EquipmentItemCardView({equipmentItems, appUsers}: EquipmentItemCardViewProps) {

    const getOwnerName: (item: EquipmentItem) => string = (item) => {
        const itemOwner = appUsers.find(user => user.id === item.owner)
        return (itemOwner !== undefined ? itemOwner.name : "Keiner")
    }

    return <div className={"card_container"}>
        {equipmentItems.filter(item => !item.important).length > 0 ?
            equipmentItems.filter(item => !item.important)
                .map(item => <EquipmentItemCard key={item.id} equipmentItem={item}  ownerName={getOwnerName(item)}/>): <p>Nichts da</p>}
    </div>
}