import {Button, Card, Nav, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AppUser} from "../model/AppUser";
import "./TentTopView.css"

type TentTopViewProps = {
    appUsers: AppUser[]
}

export default function TentTopView({appUsers}: TentTopViewProps) {
    const navigate = useNavigate()

    return <div>
        <Card>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link>Zelte</Nav.Link>
                    </Nav.Item>
                    <Button variant="primary" onClick={() => navigate("/campsite/addtent")}>Neues Zelt</Button>
                </Nav>
            </Card.Header>
            <Card.Body className={"body_container"} >
                <Stack direction="horizontal" gap={3}>
                    <Card.Title>User ohne Schlafplatz:</Card.Title>
                </Stack>
                <Card.Text className={"cardtext"}>
                    {appUsers.map(user => !user.tent && <Button variant={"outline-danger"}>{user.name}</Button>)}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}