import {EquipmentItem} from "../model/EquipmentItem";
import EquipmentTopView from "./EquipmentTopView";
import EquipmentItemCardView from "./EquipmentItemCardView";
import {AppUser} from "../model/AppUser";

export type EquipmentOverviewProps = {
    equipmentItems: EquipmentItem[]
    appUsers: AppUser[]
}

export default function EquipmentOverview({equipmentItems, appUsers}: EquipmentOverviewProps) {
    return <div>
        <EquipmentTopView/>
        <EquipmentItemCardView equipmentItems={equipmentItems} appUsers={appUsers}/>
    </div>
}