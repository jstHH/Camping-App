import {AppUser} from "../model/AppUser";
import {Button, Card, ListGroup, Nav} from "react-bootstrap";
import "./UserBalanceOverview.css"

export type UserBalanceOverviewProps = {
    appUsers: AppUser[]
}

export default function UserBalanceOverview({appUsers}: UserBalanceOverviewProps) {
    return <div>
        <Card>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link>Salden</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    {appUsers.map(user => <ListGroup.Item className={"booking_entry"}>
                        {user.name}
                        <Button variant={user.balance >= 0 ? "outline-success" : "outline-danger"}>{user.balance} €</Button>
                    </ListGroup.Item>)}
                </ListGroup>
            </Card.Body>
        </Card>
    </div>
}