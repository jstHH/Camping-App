import {Spending} from "../model/Spending";
import {AppUser} from "../model/AppUser";
import {Button, Card, ListGroup, Nav} from "react-bootstrap";
import {useState} from "react";
import "./SpendingCard.css"

export type SpendingCardProps = {
    spending: Spending
    appUsers: AppUser []
}

export default function SpendingCard({spending, appUsers}: SpendingCardProps) {
    const [selectOverview, setSelectOverview] = useState<boolean>(true)

    const getUserName: (userID: string) => string = (userID) => {
        const user = appUsers.find(user => user.id === userID)
        return (user !== undefined ? user.name : "Keiner")
    }

    return <div>
        <Card>
            <Card.Header>
                <Nav onSelect={(eventKey) => eventKey === "overview"? setSelectOverview(true) : setSelectOverview(false)} variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link eventKey={"overview"}>Was?</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={"involved"}>Wer?</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            {selectOverview ?
                <Card.Body>
                    <Card.Title>{spending.title}</Card.Title>
                    <Card.Text>
                        {spending.amount} € von {getUserName(spending.owner)}
                    </Card.Text>
                </Card.Body>
                : <Card.Body>
                    <Card.Title>Posten</Card.Title>
                    <Card.Text>
                        <ListGroup>
                            {spending.bookings.map(booking => <ListGroup.Item className={"booking_entry"}>
                                {getUserName(booking.user)}
                                <Button variant={booking.amount >= 0 ? "outline-success" : "outline-danger"}>{booking.amount} €</Button>
                            </ListGroup.Item>)}
                        </ListGroup>
                    </Card.Text>
                </Card.Body>}
        </Card>

    </div>
}