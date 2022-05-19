import {EquipmentItem} from "../model/EquipmentItem";
import EquipmentItemCard from "./EquipmentItemCard";
import "./EquipmentItemCardView.css"

export type EquipmentItemCardViewProps = {
    equipmentItems: EquipmentItem[]
}

export default function EquipmentItemCardView({equipmentItems}: EquipmentItemCardViewProps) {
    return <div className={"container"}>
        {equipmentItems.map(item => <EquipmentItemCard equipmentItem={item}/>)}
    </div>
}