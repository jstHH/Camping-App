import AppHeader from "../components/AppHeader";
import {EquipmentItem} from "../model/EquipmentItem";
import EquipmentOverview from "../components/EquipmentOverview";
import {AppUser} from "../model/AppUser";
import "./EquipmentPage.css"

export type EquipmentPageProps = {
    equipmentItems: EquipmentItem[]
    appUsers: AppUser[]
}

export default function EquipmentPage({equipmentItems, appUsers}: EquipmentPageProps) {
    return <div className={"page_container"}>
        <AppHeader/>
        <EquipmentOverview equipmentItems={equipmentItems} appUsers={appUsers}/>
    </div>
}