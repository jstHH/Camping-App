import {Card, Nav, Stack} from "react-bootstrap";


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
                <Stack direction="horizontal" gap={3}>
                    <Card.Title>Hier könnte ihre Werbung stehen</Card.Title>
                </Stack>
                <Card.Text className={"cardtext"}>
                    Irgendwas tolles
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}