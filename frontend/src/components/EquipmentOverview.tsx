import {EquipmentItem} from "../model/EquipmentItem";
import EquipmentTopView from "./EquipmentTopView";
import EquipmentItemCardView from "./EquipmentItemCardView";

export type EquipmentOverviewProps = {
    equipmentItems: EquipmentItem[]
}

export default function EquipmentOverview({equipmentItems}: EquipmentOverviewProps) {
    return <div>
        <EquipmentTopView/>
        <EquipmentItemCardView equipmentItems={equipmentItems}/>
    </div>
}