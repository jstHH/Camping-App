import {Button, Card, Nav, Stack} from "react-bootstrap";


export default function CarTopView() {

    return <div>
        <Card>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link>Autos</Nav.Link>
                    </Nav.Item>
                    <Button variant="primary">Neues Auto</Button>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    <Card.Title>Special title treatment</Card.Title>
                </Stack>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}