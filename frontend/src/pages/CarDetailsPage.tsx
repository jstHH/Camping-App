import {AppUser} from "../model/AppUser";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useSingleCarItem from "../hooks/useSingleCarItem";
import DetailsPageTextForm from "../components/DetailsPageTextForm";
import DetailsPageOwnerField from "../components/DetailsPageOwnerField";
import DetailsPageInvolvedField from "../components/DetailsPageInvolvedField";
import {Button, Stack} from "react-bootstrap";
import "./CarDetailsPage.css"


type CarDetailsPageProps = {
    appUsers: AppUser[]
    currentUser: AppUser
}

export default function CarDetailsPage({appUsers, currentUser}: CarDetailsPageProps) {
    const {carItem, getSingleCarItemByID} = useSingleCarItem()
    const {id} = useParams()
    //carID, setCarID
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
            //setCarID hinzufügen
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

    return <div className={"car_details_container"}>
        <DetailsPageTextForm title={title} setTitle={setTitle} description={description} setDescription={setDescription} forCar={true} startlocation={startLocation} setStartLocation={setStartLocation} trailer={trailer}/>
        <Stack>
            <DetailsPageOwnerField ownerName={findUserNameByID(owner)}/>
            <DetailsPageInvolvedField owner={owner} capacity={capacity} involved={involved} setInvolved={setInvolved} appUsers={appUsers} currentUser={currentUser} findUserNameByID={findUserNameByID}/>
            <div className={"controll_buttons"}>
                <Stack>
                    <Button type={"button"} disabled={editMode}>Ausgabe Hinzufügen</Button>
                    <div>
                        {editMode? <Button variant="danger"
                                           type={"button"}>Löschen</Button> :
                            <Button type={"button"}>Bearbeiten</Button>}
                        {editMode? <Button type={"button"} onClick={() => setEditMode(!editMode)}>Speichern</Button> :
                            <Button type={"submit"} onClick={() => navigate("/campsite")}>Fertig</Button>}
                    </div>
                </Stack>
            </div>
        </Stack>
    </div>
}