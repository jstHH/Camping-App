import AppHeader from "../components/AppHeader";
import {EquipmentItem} from "../model/EquipmentItem";
import EquipmentOverview from "../components/EquipmentOverview";

export type EquipmentPageProps = {
    equipmentItems: EquipmentItem[]
}

export default function EquipmentPage({equipmentItems}: EquipmentPageProps) {
    return <div>
        <AppHeader/>
        <EquipmentOverview equipmentItems={equipmentItems}/>
    </div>
}