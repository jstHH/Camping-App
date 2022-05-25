import useSingleEquipmentItem from "../hooks/useSingleEquipmentItem";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {AppUser} from "../model/AppUser";
import "./EquipmentDetailsPage.css"

export type EquipmentDetailsPageProps = {
    appUsers: AppUser[]
}

export default function EquipmentDetailsPage({appUsers} : EquipmentDetailsPageProps) {
    const {equipmentItem, getSingleEquipmentItemByID, setEquipmentItem} = useSingleEquipmentItem()
    const {id} = useParams()
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    useEffect(() => {
        if (id) {
            getSingleEquipmentItemByID(id)
            }
    },[id])

    useEffect(() => {
        if (equipmentItem) {
            setTitle(equipmentItem.title)
            setDescription(equipmentItem.description)
        }
    },[equipmentItem])

    return <Form className={"form_container"}>
                <Form.Group className={"titel"}>
                    <Form.Label>Titel</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className={"description"}>
                    <Form.Label>Beschreibung</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Group>
        </Form>
}