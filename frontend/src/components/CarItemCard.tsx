import { Card } from "react-bootstrap";
import {CarItem} from "../model/CarItem";


export type CarItemCardProps = {
    carItem: CarItem
    ownerName: string
}

export default function CarItemCard({carItem, ownerName} : CarItemCardProps) {

    return <div>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{carItem.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ownerName} fährt</Card.Subtitle>
                <Card.Text>
                    {carItem.capacity - carItem.involved.length} Plätze frei.
                    Start: {carItem.startLocation}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}