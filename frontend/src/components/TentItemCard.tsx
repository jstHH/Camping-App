import {TentItem} from "../model/TentItem";
import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


export type TentItemCardProps = {
    tentItem: TentItem
    ownerName: string
}

export default function TentItemCard({tentItem, ownerName}: TentItemCardProps) {
    const navigate = useNavigate()


    return <div>
        <Card onDoubleClick={() => navigate(`/campsite/tent/${tentItem.id}`)}>
            <Card.Body>
                <Card.Title>{tentItem.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">von {ownerName}</Card.Subtitle>
                {!tentItem.shelter && <Card.Text>
                    {tentItem.capacity - tentItem.involved.length} Plätze frei.
                </Card.Text>}
            </Card.Body>
        </Card>
    </div>
}