import AppHeader from "../components/AppHeader";
import {EquipmentItem} from "../model/EquipmentItem";

export type EquipmentPageProps = {
    equipmentItems: EquipmentItem[]
}

export default function EquipmentPage({equipmentItems}: EquipmentPageProps) {
    return <div>
        <AppHeader/>
    </div>
}