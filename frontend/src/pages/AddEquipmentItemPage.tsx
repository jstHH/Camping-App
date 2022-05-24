import {EquipmentItem} from "../model/EquipmentItem";
import {AppUser} from "../model/AppUser";
import {FormEvent, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export type AddEquipmentItemPageProps = {
    addEquipmentItem: (newEquipmentItem: Omit<EquipmentItem, "id">) => void
    currentUser: AppUser | undefined
}

export default function AddEquipmentItemPage({addEquipmentItem, currentUser}: AddEquipmentItemPageProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [owner, setOwner] = useState("")

    const navigate = useNavigate()

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newEquipmentItem: Omit<EquipmentItem, "id"> = {
            title: title,
            description: description,
            owner: owner,
            isDone: false,
            isImportant: false
        }

        addEquipmentItem(newEquipmentItem)
        navigate("/")
    }


    return <div>
        <Form onSubmit={onAdd}>
            <Form.Group>
                <Form.Label>Titel</Form.Label>
                <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Beschreibung</Form.Label>
                <Form.Control as="textarea" rows={3} value={description}
                              onChange={event => setDescription(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Wer kümmert sich?</Form.Label>
                <Form.Check
                    inline
                    label="Ich selbst"
                    name="group_owner"
                    type="radio"
                    id={"check_me"}
                    onChange={() => {
                        currentUser ? setOwner(currentUser.id) : setOwner("")
                    }}
                />
                <Form.Check
                    inline
                    label="Noch keiner"
                    name="group_owner"
                    type="radio"
                    id={"check_noOne"}
                />
            </Form.Group>
            <Form.Group>
                <Button variant="primary" type="submit" disabled={(title === "" || description === "" ? true:false)}>
                    Hinzufügen
                </Button>
                <Button variant="secondary" type="button" onClick={() => navigate("/")}>
                    Abbrechen
                </Button>
            </Form.Group>
        </Form>
    </div>
}