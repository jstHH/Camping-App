import AppHeader from "../components/AppHeader";
import {EquipmentItem} from "../model/EquipmentItem";
import EquipmentOverview from "../components/EquipmentOverview";
import {AppUser} from "../model/AppUser";

export type EquipmentPageProps = {
    equipmentItems: EquipmentItem[]
    appUsers: AppUser[]
}

export default function EquipmentPage({equipmentItems, appUsers}: EquipmentPageProps) {
    return <div>
        <AppHeader/>
        <EquipmentOverview equipmentItems={equipmentItems} appUsers={appUsers}/>
    </div>
}