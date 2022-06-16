import {useNavigate} from "react-router-dom";
import {Button, Card, Nav, Stack} from "react-bootstrap";
import "./EquipmentItemTopView.css"


export default function EquipmentItemTopView() {
    const navigate = useNavigate()

    return <div>
        <Card>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link>Ausrüstung</Nav.Link>
                    </Nav.Item>
                    <Button variant="primary" onClick={() => navigate("/equipment/additem")}>Neue Ausrüstung</Button>
                </Nav>
            </Card.Header>
            <Card.Body className={"body_container"}>
                <Stack direction="horizontal" gap={3}>
                    <Card.Title>Testtitel</Card.Title>
                </Stack>
                <Card.Text className={"cardtext"}>
                    Testtext
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}