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
}

export default function DetailsPageInvolvedField({owner, capacity, involved, setInvolved, currentUser, findUserNameByID}: DetailsPageInvolvedFieldProps) {
    return <div>
        <Stack>
            <Form.Label>Wer fährt mit?</Form.Label>
            <Form.Label>{capacity - involved.length} Plätze frei</Form.Label>
            {involved.map(user => <Button variant={"outline-dark"}>{findUserNameByID(user)}</Button>)}
            {owner !== currentUser.id && !involved.includes(currentUser.id)? <Button variant={"primary"}
                                                                                     type={"button"}
                                                                                     onClick={() => setInvolved([...involved, currentUser.id])}>Eintragen</Button>:
            involved.includes(currentUser.id) && <Button variant={"secondary"}
                                                         type={"button"}
                                                         onClick={() => setInvolved(involved.filter(user => user !== currentUser.id))}>Austragen</Button> }
        </Stack>
    </div>

}