import {Card, Nav} from "react-bootstrap";
import "./EquipmentImportantTopView.css"

export default function EquipmentImportantTopView() {

    return <div>
    <Card className={"topcard"}>
        <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                    <Nav.Link>Wichtig</Nav.Link>
                </Nav.Item>
            </Nav>
        </Card.Header>
    </Card>
</div>
}