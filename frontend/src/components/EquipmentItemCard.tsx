import {EquipmentItem} from "../model/EquipmentItem";
import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./EquipmentItemCard.css"


export type EquipmentItemCardProps = {
    equipmentItem: EquipmentItem
    ownerName: string
}

export default function EquipmentItemCard({equipmentItem, ownerName}: EquipmentItemCardProps) {
    const navigate = useNavigate();

    return <div>
        <Card  className={"equipment_card"} border={!equipmentItem.owner ? "danger" : equipmentItem.done ? "success" : ""} onDoubleClick={() => navigate(`/equipment/${equipmentItem.id}`)}>
            <Card.Body>
                <Card.Title>{equipmentItem.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ownerName} kümmert sich</Card.Subtitle>
                {equipmentItem.done && <Card.Text>erledigt</Card.Text>}
            </Card.Body>
        </Card>
    </div>
}