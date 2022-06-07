import {AppUser} from "../model/AppUser";
import useSingleTentItem from "../hooks/useSingleTentItem";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DetailsPageTextForm from "../components/DetailsPageTextForm";
import DetailsPageOwnerField from "../components/DetailsPageOwnerField";
import DetailsPageInvolvedField from "../components/DetailsPageInvolvedField";
import {Button, Stack} from "react-bootstrap";
import "./TentDetailsPage.css"


type TentDetailsPageProps = {
    appUsers: AppUser[]
    currentUser: AppUser
}

export default function TentDetailsPage({appUsers, currentUser}: TentDetailsPageProps) {
    const {tentItem, getSingleTentItemByID} = useSingleTentItem()
    const {id} = useParams()

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [owner, setOwner] = useState<string>("")
    const [involved, setInvolved] = useState<string[]>([])
    const [capacity, setCapacity] = useState<number>(0)
    const [shelter, setShelter] = useState<boolean>(false)

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
            setTitle(tentItem.title)
            setDescription(tentItem.description)
            setOwner(tentItem.owner)
            setInvolved(tentItem.involved)
            setCapacity(tentItem.capacity)
            setShelter(tentItem.shelter)
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
                    <Button type={"button"} disabled={editMode}>Ausgabe Hinzufügen</Button>
                    <div>
                        {editMode? <Button variant="danger"
                                           type={"button"}
                                           >Löschen</Button> :
                            <Button type={"button"}
                                    onClick={() => setEditMode(!editMode)}>Bearbeiten</Button>}
                        {editMode? <Button type={"button"}
                                           onClick={() => setEditMode(!editMode)}>Speichern</Button> :
                            <Button type={"submit"} onClick={() => navigate("/campsite")}>Fertig</Button>}
                    </div>
                </Stack>
            </div>
        </Stack>
    </div>
}