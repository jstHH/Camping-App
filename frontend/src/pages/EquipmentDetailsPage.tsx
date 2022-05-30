import useSingleEquipmentItem from "../hooks/useSingleEquipmentItem";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Form, FormCheck, Stack} from "react-bootstrap";
import {AppUser} from "../model/AppUser";
import "./EquipmentDetailsPage.css"
import useEquipmentItems from "../hooks/useEquipmentItems";
import {EquipmentItem} from "../model/EquipmentItem";

export type EquipmentDetailsPageProps = {
    appUsers: AppUser[]
    currentUser: AppUser
}

export default function EquipmentDetailsPage({appUsers, currentUser} : EquipmentDetailsPageProps) {
    const {equipmentItem, getSingleEquipmentItemByID} = useSingleEquipmentItem()
    const {updateEquipmentItem} = useEquipmentItems()
    const {id} = useParams()
    const [itemID, setItemID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [ownerID, setOwnerID] = useState<string>("")
    const [involved, setInvolved] = useState<string[]>([])
    const [isImportant, setIsImportant] = useState<boolean>(false)
    const [isDone, setIsDone] = useState<boolean>(false)


    const [editMode, setEditMode] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
            if (id) {
                getSingleEquipmentItemByID(id)
            }
        // eslint-disable-next-line
        }, [id])

    useEffect(() => {
        if (equipmentItem) {
            setItemID(equipmentItem.id)
            setTitle(equipmentItem.title)
            setDescription(equipmentItem.description)
            setOwnerID(equipmentItem.owner)
            setIsImportant(equipmentItem.important)
            setIsDone(equipmentItem.done)
            if ((equipmentItem.involved != null)) {
                setInvolved(equipmentItem.involved)
            }
        }},[equipmentItem])


    const findUserNameByID = (id: string) => {
        if (appUsers.find(user => user.id === id)) {
            const user = appUsers.find(user => user.id === id)
            if (user) {
                return user.name
            }
        }
        return "Keiner"
    }

    const onSubmit = () => {
        const changedItem: EquipmentItem = {
            id: itemID,
            title: title,
            description: description,
            owner: ownerID,
            involved: involved,
            important: isImportant,
            done: isDone
        }
        updateEquipmentItem(changedItem)
        navigate("/")
    }


    return<div className={"edit_container"}>
                <Form onSubmit={onSubmit}>
                <Form.Group className={"titel"}>
                    <Form.Label>Titel</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        disabled={!editMode}
                    />
                </Form.Group>
                <Form.Group className={"description"}>
                    <Form.Label>Beschreibung</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        disabled={!editMode}
                    />
                </Form.Group>
                <Form.Group className={"checkboxen"}>
                    <FormCheck type={"checkbox"}
                               label={"Wichtig?"}
                               checked={isImportant}
                               disabled={!editMode}
                               onClick={() =>setIsImportant(!isImportant)}/>
                    <FormCheck type={"checkbox"}
                               label={"Erledigt?"}
                               checked={isDone}
                               disabled={!editMode}
                               onClick={() =>setIsDone(!isDone)} />
                </Form.Group>
            </Form>
        <div>
            <div className={"owner"}>
                <Stack direction="horizontal" gap={5}>
                    <Form.Label>Wer kümmert sich?</Form.Label>
                    {(ownerID ?
                        <Button variant={"outline-dark"}
                                disabled={editMode}
                                onClick={() => setOwnerID("")}>{findUserNameByID(ownerID)}</Button> :
                        !involved.includes(currentUser.id) &&
                        <Button variant={"primary"}
                                disabled={editMode}
                                onClick={() => setOwnerID(currentUser.id)}>Übernehmen</Button>)}
                </Stack>
            </div>
            <div className={"involved"}>
                <Stack>
                    <Form.Label>Wer ist dabei?</Form.Label>
                    {appUsers.filter(user => involved.includes(user.id))
                        .map(involvedUser => <Button variant={"outline-dark"}>{findUserNameByID(involvedUser.id)}</Button>)}
                    {(currentUser && (!involved.includes(currentUser.id) && ownerID !== currentUser.id) ?
                        <Button variant="primary"
                                type={"button"}
                                disabled={editMode}
                                onClick={() => setInvolved([...involved, currentUser.id])}> Eintragen</Button> : currentUser.id
                        !== ownerID && <Button variant="secondary"
                                               type={"button"}
                                               disabled={editMode}
                                               onClick={() => setInvolved(involved.filter(user => user !== currentUser.id))}> Austragen</Button>)}
                </Stack>
            </div>
            <div className={"controll_buttons"}>
                <Stack>
                    <Button type={"button"} disabled={editMode}>Ausgabe Hinzufügen</Button>
                    <div>
                        {editMode? <Button variant="danger"
                                           type={"button"}>Löschen</Button> :
                            <Button type={"button"} onClick={() => setEditMode(!editMode)}>Bearbeiten</Button>}
                        {editMode? <Button type={"button"} onClick={() => setEditMode(!editMode)}>Speichern</Button> :
                            <Button type={"submit"} onClick={() => onSubmit()}>Fertig</Button>}
                    </div>
                </Stack>
            </div>
        </div>
    </div>
}