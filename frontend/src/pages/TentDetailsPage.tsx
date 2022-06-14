import {AppUser} from "../model/AppUser";
import useSingleTentItem from "../hooks/useSingleTentItem";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DetailsPageTextForm from "../components/DetailsPageTextForm";
import DetailsPageOwnerField from "../components/DetailsPageOwnerField";
import DetailsPageInvolvedField from "../components/DetailsPageInvolvedField";
import {Button, Stack} from "react-bootstrap";
import "./TentDetailsPage.css"
import {TentItem} from "../model/TentItem";
import DetailsPageSpendingField from "../components/DetailsPageSpendingField";
import {SpendingItemDTO} from "../model/SpendinItemDTO";
import {Spending} from "../model/Spending";


type TentDetailsPageProps = {
    appUsers: AppUser[]
    currentUser: AppUser
    updateTentItem: (changedTentItem: TentItem) => void
    removeTentItem: (id: string) => void
    addSpending: (spendingItemDTO: SpendingItemDTO) => Promise<Spending | void>
    removeSpending: (id: string) => Promise<string>
}

export default function TentDetailsPage({appUsers, currentUser, updateTentItem, removeTentItem, addSpending, removeSpending}: TentDetailsPageProps) {
    const {tentItem, getSingleTentItemByID} = useSingleTentItem()
    const {id} = useParams()
    const [tentID, setTentID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [owner, setOwner] = useState<string>("")
    const [involved, setInvolved] = useState<string[]>([])
    const [capacity, setCapacity] = useState<number>(0)
    const [shelter, setShelter] = useState<boolean>(false)
    const [spending, setSpending] = useState<string>("")

    const [editMode, setEditMode] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            getSingleTentItemByID(id)
        }
        // eslint-disable-next-line
    },[id])

    useEffect(() => {
        if (tentItem) {
            setTentID(tentItem.id)
            setTitle(tentItem.title)
            setDescription(tentItem.description)
            setOwner(tentItem.owner)
            setInvolved(tentItem.involved)
            setCapacity(tentItem.capacity)
            setShelter(tentItem.shelter)
            setSpending(tentItem.spending)
        }
        // eslint-disable-next-line
    }, [tentItem])

    const findUserNameByID = (id: string) => {
        if (appUsers.find(user => user.id === id)) {
            const user = appUsers.find(user => user.id === id)
            if (user) {
                return user.name
            }
        }
        return "Keiner"
    }

    const onSave = () => {
        const changedTentItem = {
            id: tentID,
            title: title,
            description: description,
            owner: owner,
            involved: involved,
            capacity: capacity,
            shelter: shelter,
            spending: spending
        }
        updateTentItem(changedTentItem)
    }

    const onSaveNavigate = () => {
        onSave()
        navigate("/campsite")
    }

    const onDelete = () => {
        removeTentItem(tentID)
        navigate("/campsite")
    }



    return <div className={"tent_details_container"}>
        <DetailsPageTextForm title={title}
                             setTitle={setTitle}
                             description={description}
                             setDescription={setDescription}
                             forCar={false}
                             shelter={shelter}
                             editMode={editMode}/>
        <Stack>
            <DetailsPageOwnerField ownerName={findUserNameByID(owner)} forCar={false}/>
            {!shelter && <DetailsPageInvolvedField owner={owner}
                                                   capacity={capacity}
                                                   involved={involved}
                                                   setInvolved={setInvolved}
                                                   appUsers={appUsers}
                                                   currentUser={currentUser}
                                                   findUserNameByID={findUserNameByID}
                                                   editMode={editMode}
                                                   forCar={false}/>}
            <div className={"controll_buttons"}>
                <Stack>
                    <DetailsPageSpendingField title={title}
                                              itemID={tentID}
                                              itemClass={"tents"}
                                              owner={owner}
                                              involved={involved}
                                              editMode={editMode}
                                              spending={spending}
                                              setSpending={setSpending}
                                              addSpending={addSpending}
                                              removeSpending={removeSpending}
                                              saveItem={onSave}/>
                    <div>
                        {editMode? <Button variant="danger"
                                           type={"button"}
                                           onClick={() => onDelete()}
                                           >Löschen</Button> :
                            <Button type={"button"}
                                    onClick={() => setEditMode(!editMode)}>Bearbeiten</Button>}
                        {editMode? <Button type={"button"}
                                           onClick={() => setEditMode(!editMode)}>Speichern</Button> :
                            <Button type={"submit"} onClick={() => onSaveNavigate()}>Fertig</Button>}
                    </div>
                </Stack>
            </div>
        </Stack>
    </div>
}