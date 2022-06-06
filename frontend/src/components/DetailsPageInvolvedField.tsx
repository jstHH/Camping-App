import {AppUser} from "../model/AppUser";
import {Button, Form, Stack} from "react-bootstrap";


type DetailsPageInvolvedFieldProps = {
    owner: string
    capacity: number
    involved: string[]
    setInvolved: (newInvolved: string[]) => void
    appUsers: AppUser[]
    currentUser: AppUser
    findUserNameByID: (id:string) => string
    editMode: boolean
}

export default function DetailsPageInvolvedField({owner, capacity, involved, setInvolved, currentUser, findUserNameByID, editMode}: DetailsPageInvolvedFieldProps) {
    return <div>
        <Stack>
            <Stack direction={"horizontal"} gap={3}>
                <Form.Label>Wer fährt mit?</Form.Label>
                <Form.Label>{capacity - involved.length} Plätze frei</Form.Label>
            </Stack>
            {involved.map(user => <Button variant={"outline-dark"}>{findUserNameByID(user)}</Button>)}
            {owner !== currentUser.id && !involved.includes(currentUser.id)? <Button variant={"primary"}
                                                                                     type={"button"}
                                                                                     disabled={editMode}
                                                                                     onClick={() => setInvolved([...involved, currentUser.id])}>Einsteigen</Button>:
            involved.includes(currentUser.id) && <Button variant={"secondary"}
                                                         type={"button"}
                                                         disabled={editMode}
                                                         onClick={() => setInvolved(involved.filter(user => user !== currentUser.id))}>Aussteigen</Button> }
        </Stack>
    </div>

}