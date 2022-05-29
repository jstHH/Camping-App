import {EquipmentItem} from "../model/EquipmentItem";
import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


export type EquipmentItemCardProps = {
    equipmentItem: EquipmentItem
    ownerName: string
}

export default function EquipmentItemCard({equipmentItem, ownerName}: EquipmentItemCardProps) {
    const navigate = useNavigate();

    return <div>
        <Card style={{ width: '18rem' }} onDoubleClick={() => navigate(`/equipment/${equipmentItem.id}`)}>
            <Card.Body>
                <Card.Title>{equipmentItem.title}</Card.Title>
                <Card.Text>
                    {ownerName} kümmert sich
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}