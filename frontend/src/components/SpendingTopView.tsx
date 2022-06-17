import {Card, Nav} from "react-bootstrap";


export default function SpendingTopView() {
    return <div>
        <Card>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link>Ausgaben</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Card.Text className={"cardtext"}>
                    Gehe in die Detailansicht deiner Autos, Zelte und Ausrüstungen um Ausgaben zu erstellen oder zu löschen.
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}