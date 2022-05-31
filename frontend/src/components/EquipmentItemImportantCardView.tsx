import {EquipmentItem} from "../model/EquipmentItem";
import {AppUser} from "../model/AppUser";
import EquipmentItemCard from "./EquipmentItemCard";
import { Button } from "react-bootstrap";
import "./EquipmentItemImportantCardView.css"

export type EquipmentItemImportantCardViewProps = {
    equipmentItems: EquipmentItem[]
    appUsers: AppUser[]
}

    export default function EquipmentItemImportantCardView({equipmentItems, appUsers}: EquipmentItemImportantCardViewProps) {

        const getOwnerName: (item: EquipmentItem) => string = (item) => {
            const itemOwner = appUsers.find(user => user.id === item.owner)
            return (itemOwner !== undefined ? itemOwner.name : "Keiner")
        }

        return <div className={"important_container"}>
            <Button variant="outline-danger">Wichtig</Button>
            <div className={"card_container"}>{equipmentItems.filter(item => item.important).length > 0 &&
                equipmentItems.filter(item => item.important)
                    .map(item => <EquipmentItemCard key={item.id} equipmentItem={item}  ownerName={getOwnerName(item)}/>)}
            </div>
        </div>

}