import {EquipmentItem} from "../model/EquipmentItem";
import {Card} from "react-bootstrap";


export type EquipmentItemCardProps = {
    equipmentItem: EquipmentItem
    ownerName: string
}

export default function EquipmentItemCard({equipmentItem, ownerName}: EquipmentItemCardProps) {
    return <div>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{equipmentItem.title}</Card.Title>
                <Card.Text>
                    {ownerName} kümmert sich
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}