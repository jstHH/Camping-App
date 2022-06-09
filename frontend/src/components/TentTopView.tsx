import {Button, Card, Nav, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {TentItem} from "../model/TentItem";
import {AppUser} from "../model/AppUser";
import {useEffect, useState} from "react";
import "./TentTopView.css"

type TentTopViewProps = {
    tentItems: TentItem[]
    appUsers: AppUser[]
}

export default function TentTopView({tentItems, appUsers}: TentTopViewProps) {
    const navigate = useNavigate()
    const [filteredTents, setFilteredTents] = useState<TentItem[]>([])
    const [userWithoutTent, setUserWithoutTent] = useState<AppUser[]>([])

    useEffect(() => {
        setFilteredTents(tentItems.filter(tent => !tent.shelter))
        //console.log(filteredTents)
    }, [tentItems])

    useEffect(() => {
        appUsers?.forEach(user => filteredTents.filter(tent => tent.owner === user.id).length === 0
            && filteredTents.filter(tent => tent.involved.includes(user.id)).length === 0
            && !userWithoutTent.includes(user)
            && setUserWithoutTent([...userWithoutTent, user]))
        // eslint-disable-next-line
    }, [filteredTents])

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
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    <Card.Title>User ohne Schlafplatz:</Card.Title>
                </Stack>
                <Card.Text className={"cardtext"}>
                    {userWithoutTent.map(user => <Button variant={"outline-danger"}>{user.name}</Button>)}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}