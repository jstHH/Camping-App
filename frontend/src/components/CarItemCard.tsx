import { Card } from "react-bootstrap";
import {CarItem} from "../model/CarItem";
import {useNavigate} from "react-router-dom";


export type CarItemCardProps = {
    carItem: CarItem
    ownerName: string
}

export default function CarItemCard({carItem, ownerName} : CarItemCardProps) {
    const navigate = useNavigate()

    return <div>
        <Card onDoubleClick={() => navigate(`/campsite/car/${carItem.id}`)}>
            <Card.Body>
                <Card.Title>{carItem.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ownerName} fährt</Card.Subtitle>
                <Card.Text>
                    {carItem.capacity - carItem.involved.length === 0 ? "Voll"
                        : carItem.capacity - carItem.involved.length === 1 ? "1 Platz frei"
                            : (carItem.capacity - carItem.involved.length) + " Plätze frei. "}
                    Start: {carItem.startLocation}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}