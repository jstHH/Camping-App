import {AppUser} from "../model/AppUser";
import {Button, Form, Stack} from "react-bootstrap";


type DetailsPageInvolvedFieldProps = {
    owner: string
    capacity: number
    involved: string[]
    setInvolved: (newInvolved: string[]) => void
    appUsers: AppUser[]
    currentUser: AppUser
    forCar: boolean
    findUserNameByID: (id:string) => string
    editMode: boolean
}

export default function DetailsPageInvolvedField({owner, capacity, involved, setInvolved, currentUser, forCar, findUserNameByID, editMode}: DetailsPageInvolvedFieldProps) {
    const textIn: string = forCar ? "Einsteigen" : "Platz buchen"
    const textOut: string = forCar ? "Austeigen" : "Platz freigeben"
    const textLabel: string = forCar ? "Wer fährt mit?" : "Wer liegt drin?"

    return <div>
        <Stack>
            <Stack direction={"horizontal"} gap={3}>
                <Form.Label>{capacity - involved.length} Plätze frei</Form.Label>
                <Form.Label>{textLabel}</Form.Label>
            </Stack>
            {involved.map(user => <Button variant={"info"}>{findUserNameByID(user)}</Button>)}
            {owner !== currentUser.id && !involved.includes(currentUser.id)? <Button variant={"primary"}
                                                                                     type={"button"}
                                                                                     disabled={editMode  || (involved.length >= capacity && true)}
                                                                                     onClick={() => setInvolved([...involved, currentUser.id])}>{textIn}</Button>:
            involved.includes(currentUser.id) && <Button variant={"secondary"}
                                                         type={"button"}
                                                         disabled={editMode}
                                                         onClick={() => setInvolved(involved.filter(user => user !== currentUser.id))}>{textOut}</Button> }
        </Stack>
    </div>

}