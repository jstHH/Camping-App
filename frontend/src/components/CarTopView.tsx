import {Button, Card, Nav, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AppUser} from "../model/AppUser";
import "./CarTopView.css"

type CarTopViewProps = {
    appUsers: AppUser[]
}

export default function CarTopView({appUsers}: CarTopViewProps) {
    const navigate = useNavigate()


    return <div>
        <Card>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link>Autos</Nav.Link>
                    </Nav.Item>
                    <Button variant="primary" onClick={() => navigate("/campsite/addcar")}>Neues Auto</Button>
                </Nav>
            </Card.Header>
            <Card.Body className={"body_container"}>
                <Stack direction="horizontal" gap={3}>
                    <Card.Title>User ohne Mitfahrgelegenheit:</Card.Title>
                </Stack>
                <Card.Text className={"cardtext"}>
                    {appUsers.map(user => !user.car && <Button variant={"outline-danger"}>{user.name}</Button>)}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}