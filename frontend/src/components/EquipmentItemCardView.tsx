import {EquipmentItem} from "../model/EquipmentItem";
import EquipmentItemCard from "./EquipmentItemCard";
import "./EquipmentItemCardView.css"

export type EquipmentItemCardViewProps = {
    equipmentItems: EquipmentItem[]
}

export default function EquipmentItemCardView({equipmentItems}: EquipmentItemCardViewProps) {
    return <div className={"container"}>
        {equipmentItems.length > 0  ? (equipmentItems.map(item => <EquipmentItemCard key={item.id} equipmentItem={item}/>)): <p>Nichts da</p>}
    </div>
}