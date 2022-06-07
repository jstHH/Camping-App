import {TentItem} from "../model/TentItem";
import {Card} from "react-bootstrap";


export type TentItemCardProps = {
    tentItem: TentItem
    ownerName: string
}

export default function TentItemCard({tentItem, ownerName}: TentItemCardProps) {


    return <div>
        <Card>
            <Card.Body>
                <Card.Title>{tentItem.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">von {ownerName}</Card.Subtitle>
                <Card.Text>
                    {tentItem.capacity - tentItem.involved.length} Plätze frei.
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}