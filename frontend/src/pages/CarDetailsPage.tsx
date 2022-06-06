import {AppUser} from "../model/AppUser";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useSingleCarItem from "../hooks/useSingleCarItem";
import DetailsPageTextForm from "../components/DetailsPageTextForm";
import DetailsPageOwnerField from "../components/DetailsPageOwnerField";
import DetailsPageInvolvedField from "../components/DetailsPageInvolvedField";
import {Button, Stack} from "react-bootstrap";
import "./CarDetailsPage.css"
import {CarItem} from "../model/CarItem";


type CarDetailsPageProps = {
    appUsers: AppUser[]
    currentUser: AppUser
    updateCarItem: (changedCarItem: CarItem) => void
    removeCarItem: (carID: string) => void
}

export default function CarDetailsPage({appUsers, currentUser, updateCarItem, removeCarItem}: CarDetailsPageProps) {
    const {carItem, getSingleCarItemByID} = useSingleCarItem()
    const {id} = useParams()
    const [carID, setCarID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [owner, setOwner] = useState<string>("")
    const [involved, setInvolved] = useState<string[]>([])
    const [capacity, setCapacity] = useState<number>(0)
    const [trailer, setTrailer] = useState<boolean>(false)
    const [startLocation, setStartLocation] = useState<string>("")

    const [editMode, setEditMode] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            getSingleCarItemByID(id)
        }
        // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        if (carItem) {
            setCarID(carItem.id)
            setTitle(carItem.title)
            setDescription(carItem.description)
            setOwner(carItem.owner)
            setInvolved(carItem.involved)
            setCapacity(carItem.capacity)
            setTrailer(carItem.trailer)
            setStartLocation(carItem.startLocation)
        }
        // eslint-disable-next-line
    }, [carItem])

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
        const changedCarItem: CarItem = {
            id: carID,
            title: title,
            description: description,
            owner: owner,
            involved: involved,
            capacity: capacity,
            trailer: trailer,
            startLocation: startLocation
        }
        updateCarItem(changedCarItem)
        navigate("/campsite")
    }

    const onDelete = () => {
        removeCarItem(carID)
        navigate("/campsite")
    }

    return <div className={"car_details_container"}>
        <DetailsPageTextForm title={title}
                             setTitle={setTitle}
                             description={description}
                             setDescription={setDescription}
                             forCar={true} startlocation={startLocation}
                             setStartLocation={setStartLocation}
                             trailer={trailer}
                             editMode={editMode}/>
        <Stack>
            <DetailsPageOwnerField ownerName={findUserNameByID(owner)}/>
            {!trailer && <DetailsPageInvolvedField owner={owner}
                                                   capacity={capacity}
                                                   involved={involved}
                                                   setInvolved={setInvolved}
                                                   appUsers={appUsers}
                                                   currentUser={currentUser}
                                                   findUserNameByID={findUserNameByID}
                                                   editMode={editMode}/>}
            <div className={"controll_buttons"}>
                <Stack>
                    <Button type={"button"} disabled={editMode}>Ausgabe Hinzufügen</Button>
                    <div>
                        {editMode? <Button variant="danger"
                                           type={"button"}
                                           onClick={() => onDelete()}>Löschen</Button> :
                            <Button type={"button"}
                                    onClick={() => setEditMode(!editMode)}>Bearbeiten</Button>}
                        {editMode? <Button type={"button"}
                                           onClick={() => setEditMode(!editMode)}>Speichern</Button> :
                            <Button type={"submit"}
                                    onClick={() => onSave()}>Fertig</Button>}
                    </div>
                </Stack>
            </div>
        </Stack>
    </div>
}