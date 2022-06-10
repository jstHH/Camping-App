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
import {SpendingItemDTO} from "../model/SpendinItemDTO";
import {Spending} from "../model/Spending";
import DetailsPageSpendingField from "../components/DetailsPageSpendingField";


type CarDetailsPageProps = {
    appUsers: AppUser[]
    currentUser: AppUser
    updateCarItem: (changedCarItem: CarItem) => void
    removeCarItem: (carID: string) => void
    addSpending: (spendingItemDTO: SpendingItemDTO) => Promise<Spending | void>
}

export default function CarDetailsPage({appUsers, currentUser, updateCarItem, removeCarItem, addSpending}: CarDetailsPageProps) {
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
    const [spending, setSpending] = useState<string>("")

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
            setSpending(carItem.spending)
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
            startLocation: startLocation,
            spending: spending
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
            <DetailsPageOwnerField ownerName={findUserNameByID(owner)} forCar={true}/>
            {!trailer && <DetailsPageInvolvedField owner={owner}
                                                   capacity={capacity}
                                                   involved={involved}
                                                   setInvolved={setInvolved}
                                                   appUsers={appUsers}
                                                   currentUser={currentUser}
                                                   findUserNameByID={findUserNameByID}
                                                   editMode={editMode}
                                                   forCar={true}/>}
            <div className={"controll_buttons"}>
                <Stack>
                    <DetailsPageSpendingField title={title}
                                              itemID={carID}
                                              itemClass={"cars"}
                                              owner={owner}
                                              involved={involved}
                                              editMode={editMode}
                                              spending={spending}
                                              setSpending={setSpending}
                                              addSpending={addSpending} />
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