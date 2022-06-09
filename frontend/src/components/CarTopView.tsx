import {Button, Card, Nav, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {CarItem} from "../model/CarItem";
import {AppUser} from "../model/AppUser";
import {useEffect, useState} from "react";
import "./CarTopView.css"

type CarTopViewProps = {
    carItems: CarItem[]
    appUsers: AppUser[]
}


export default function CarTopView({carItems, appUsers}: CarTopViewProps) {
    const [userWithoutCar, setUserWithoutCar] = useState<AppUser[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        appUsers?.forEach(user => carItems.filter(car => car.owner === user.id).length === 0
            && carItems.filter(car => car.involved.includes(user.id)).length === 0
            && !userWithoutCar.includes(user)
            && setUserWithoutCar([...userWithoutCar, user]))
        // eslint-disable-next-line
    }, [carItems])

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
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    <Card.Title>User ohne Mitfahrgelegenheit:</Card.Title>
                </Stack>
                <Card.Text className={"cardtext"}>
                    {userWithoutCar.map(user => <Button variant={"outline-danger"}>{user.name}</Button>)}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
}