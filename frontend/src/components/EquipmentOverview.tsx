import {EquipmentItem} from "../model/EquipmentItem";
import EquipmentItemCardView from "./EquipmentItemCardView";
import {AppUser} from "../model/AppUser";
import EquipmentItemImportantCardView from "./EquipmentItemImportantCardView";
import EquipmentItemTopView from "./EquipmentItemTopView";
import EquipmentImportantTopView from "./EquipmentImportantTopView";
import "./EquipmentOverview.css"

export type EquipmentOverviewProps = {
    equipmentItems: EquipmentItem[]
    appUsers: AppUser[]
}

export default function EquipmentOverview({equipmentItems, appUsers}: EquipmentOverviewProps) {
    return <div className={"equipment_overview"}>
        <div>
            <EquipmentImportantTopView/>
            <EquipmentItemImportantCardView equipmentItems={equipmentItems} appUsers={appUsers}/>
        </div>
        <div>
            <EquipmentItemTopView/>
            <EquipmentItemCardView equipmentItems={equipmentItems} appUsers={appUsers}/>
        </div>
    </div>
}