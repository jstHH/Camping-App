import {EquipmentItem} from "../model/EquipmentItem";
import {Card} from "react-bootstrap";


export type EquipmentItemCardProps = {
    equipmentItem: EquipmentItem
}

export default function EquipmentItemCard({equipmentItem}: EquipmentItemCardProps) {
    return <div>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{equipmentItem.title}</Card.Title>
                <Card.Text>
                    {equipmentItem.owner} kümmert sich
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}