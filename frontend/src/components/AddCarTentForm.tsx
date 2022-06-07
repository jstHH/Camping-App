import {Omit} from "react-bootstrap/helpers";
import {CarItem} from "../model/CarItem";
import {AppUser} from "../model/AppUser";
import {FormEvent, useState} from "react";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {TentItem} from "../model/TentItem";


export type AddCarTentFormProps = {
    addCarItem?: (newCarItem: Omit<CarItem, "id">) => void
    addTentItem?: (newCarItem: Omit<TentItem, "id">) => void
    currentUser: AppUser | undefined
    forCar: boolean
}

export default function AddCarTentForm({addCarItem, addTentItem, currentUser, forCar}: AddCarTentFormProps) {
    const [title, setTitle] = useState<string>("")
    const [capacity, setCapacity] = useState<number>(0)
    const [trailer, setTrailer] = useState<boolean>(false)
    const [pavillion, setPavillion] = useState<boolean>(false)
    const [startLocation, setStartLocation] = useState<string>("")

    const navigate = useNavigate()

    const onAddCar = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newCarItem: Omit<CarItem, "id"> = {
            id: "",
            title: title,
            description: "",
            owner: (currentUser? currentUser.id : ""),
            involved: [],
            capacity: capacity,
            trailer: trailer,
            spending: "",
            startLocation: startLocation
        }
        if (addCarItem) {
            addCarItem(newCarItem)
        }
        navigate("/campsite")
    }

    const onAddTent = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newTentItem: Omit<TentItem, "id"> = {
            id: "",
            title: title,
            description: "",
            owner: (currentUser? currentUser.id : ""),
            involved: [],
            capacity: capacity,
            shelter: pavillion,
            spending: ""
        }
        if (addTentItem) {
            addTentItem(newTentItem)
        }
        navigate("/campsite")
    }


    return <div>
        <Form onSubmit={forCar? onAddCar: onAddTent}>
            <Form.Group>
                <Form.Label>Bezeichnung</Form.Label>
                <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Check onChange={() => {
                    (forCar? setTrailer(!trailer): setPavillion(!pavillion))
                    setCapacity(0)
                }}
                            inline
                            label={forCar? "Anhänger?" : "Pavillion?"}
                            name="category"
                            type="checkbox"
                            id={"check_category"}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>{forCar? "Wieviele können mitfahren?": "Wieviele Plätze sind noch frei?"}</Form.Label>
                <ButtonGroup>
                    <Button variant={capacity === 1? "dark" : "outline-dark"} disabled={forCar? trailer : pavillion} onClick={() => setCapacity(1)}>1</Button>
                    <Button variant={capacity === 2? "dark" : "outline-dark"} disabled={forCar? trailer : pavillion} onClick={() => setCapacity(2)}>2</Button>
                    <Button variant={capacity === 3? "dark" : "outline-dark"} disabled={forCar? trailer : pavillion} onClick={() => setCapacity(3)}>3</Button>
                    <Button variant={capacity === 4? "dark" : "outline-dark"} disabled={forCar? trailer : pavillion} onClick={() => setCapacity(4)}>4</Button>
                </ButtonGroup>
            </Form.Group>
            { forCar && <Form.Group>
                <Form.Group>
                    <Form.Label>Wo geht es los?</Form.Label>
                    <Form.Control type="text" value={startLocation} onChange={event => setStartLocation(event.target.value)}/>
                </Form.Group>
            </Form.Group> }
            <Form.Group>
                <Button variant="primary" type="submit" disabled={title === ""}>
                    Hinzufügen
                </Button>
                <Button variant="secondary" type="button" onClick={() => navigate("/campsite")}>
                    Abbrechen
                </Button>
            </Form.Group>
        </Form>
    </div>
}