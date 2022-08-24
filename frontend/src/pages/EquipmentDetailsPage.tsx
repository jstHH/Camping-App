import useSingleEquipmentItem from "../hooks/useSingleEquipmentItem";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Form, FormCheck} from "react-bootstrap";
import {AppUser} from "../model/AppUser";
import "./EquipmentDetailsPage.css"
import {EquipmentItem} from "../model/EquipmentItem";
import {SpendingItemDTO} from "../model/SpendinItemDTO";
import {Spending} from "../model/Spending";
import DetailsPageSpendingField from "../components/DetailsPageSpendingField";

export type EquipmentDetailsPageProps = {
    appUsers: AppUser[]
    currentUser: AppUser
    updateEquipmentItem: (changedEquipmentItem: EquipmentItem) => void
    removeEquipmentItem: (equipmentItemID: string) => void
    addSpending: (spendingItemDTO: SpendingItemDTO) => Promise<Spending | void>
    removeSpending: (id: string) => Promise<string>
}

export default function EquipmentDetailsPage({
                                                 appUsers,
                                                 currentUser,
                                                 updateEquipmentItem,
                                                 removeEquipmentItem,
                                                 addSpending,
                                                 removeSpending
                                             }: EquipmentDetailsPageProps) {
    const {equipmentItem, getSingleEquipmentItemByID} = useSingleEquipmentItem()
    const {id} = useParams()
    const [itemID, setItemID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [ownerID, setOwnerID] = useState<string>("")
    const [involved, setInvolved] = useState<string[]>([])
    const [isImportant, setIsImportant] = useState<boolean>(false)
    const [isDone, setIsDone] = useState<boolean>(false)
    const [spending, setSpending] = useState<string>("")


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
            setSpending(equipmentItem.spending)
        }
    }, [equipmentItem])


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
            done: isDone,
            spending: spending
        }
        updateEquipmentItem(changedItem)

    }

    const onSubmitNavigate = () => {
        onSubmit()
        navigate("/equipment")
    }

    const onDelete = () => {
        if (spending) {
            removeSpending(spending)
        }
        removeEquipmentItem(itemID)
        navigate("/equipment")
    }

    const onOwnerSignOut = () => {
        setOwnerID("")
        removeSpending(spending)
            .then(response => response === spending && setSpending(""))
    }


    return <div className={"equipment_page_container"}>
        <h1>Details</h1>
        <div className={"edit_container"}>
            <Form className={"form_container"} onSubmit={onSubmit}>
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
                                   className={"important"}
                                   label={"Wichtig?"}
                                   checked={isImportant}
                                   disabled={!editMode}
                                   onClick={() => setIsImportant(!isImportant)}/>
                        <FormCheck type={"checkbox"}
                                   className={"done"}
                                   label={"Erledigt?"}
                                   checked={isDone}
                                   disabled={!editMode}
                                   onClick={() => setIsDone(!isDone)}/>
                </Form.Group>
            </Form>
            <div className={"fieldcontainer"}>
                <div className={"owner"}>
                    <Form.Label>Wer kümmert sich?</Form.Label>
                    {(ownerID ?
                        <Button variant={"info"}
                                disabled={editMode}
                                onClick={() => onOwnerSignOut()}>{findUserNameByID(ownerID)}</Button> :
                        !involved.includes(currentUser.id) &&
                        <Button variant={"primary"}
                                disabled={editMode}
                                onClick={() => setOwnerID(currentUser.id)}>Übernehmen</Button>)}
                </div>
                <div className={"involved"}>
                    <Form.Label>Wer ist dabei?</Form.Label>
                    {appUsers.filter(user => involved.includes(user.id))
                        .map(involvedUser => <Button
                            variant={"info"}>{findUserNameByID(involvedUser.id)}</Button>)}
                    {(currentUser && (!involved.includes(currentUser.id) && ownerID !== currentUser.id) ?
                        <Button variant="primary"
                                type={"button"}
                                disabled={editMode}
                                onClick={() => setInvolved([...involved, currentUser.id])}> Eintragen</Button> : currentUser.id
                        !== ownerID && <Button variant="secondary"
                                               type={"button"}
                                               disabled={editMode}
                                               onClick={() => setInvolved(involved.filter(user => user !== currentUser.id))}> Austragen</Button>)}
                </div>
                <div className={"controll_buttons"}>
                    <DetailsPageSpendingField title={title}
                                              itemID={itemID}
                                              itemClass={"equipment"}
                                              owner={ownerID}
                                              involved={involved}
                                              editMode={editMode}
                                              spending={spending}
                                              setSpending={setSpending}
                                              addSpending={addSpending}
                                              removeSpending={removeSpending}
                                              saveItem={onSubmit}
                                              currentUser={currentUser}/>
                    <div>
                        {editMode ? <Button variant="danger"
                                            type={"button"}
                                            onClick={onDelete}>Löschen</Button> :
                            <Button type={"button"} onClick={() => setEditMode(!editMode)}>Bearbeiten</Button>}
                        {editMode ?
                            <Button type={"button"} onClick={() => setEditMode(!editMode)}>Speichern</Button> :
                            <Button type={"submit"} onClick={onSubmitNavigate}>Fertig</Button>}
                    </div>
                </div>
            </div>
        </div>
    </div>
}