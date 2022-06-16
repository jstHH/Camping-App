import {FormEvent, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {SpendingItemDTO} from "../model/SpendinItemDTO";
import {Spending} from "../model/Spending";
import {AppUser} from "../model/AppUser";
import {useNavigate} from "react-router-dom";


type DetailsPageSpendingFieldProps = {
    title: string
    itemID: string
    itemClass: string
    owner: string
    involved: string[]
    editMode: boolean
    spending: string
    setSpending: (spendingID: string) => void
    addSpending: (spendingItemDTO: SpendingItemDTO) => Promise<Spending | void>
    removeSpending: (id: string) => Promise<string>
    saveItem: () => void
    currentUser: AppUser
}

export default function DetailsPageSpendingField({title, itemID, itemClass, involved, owner, editMode,spending, setSpending, addSpending, removeSpending, saveItem, currentUser}: DetailsPageSpendingFieldProps) {
    const [addSpendingMode, setAddSpendingMode] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)
    const navigate = useNavigate()

    const onSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newSpending: SpendingItemDTO = {
            title: title,
            itemID: itemID,
            itemClass: itemClass,
            owner: owner,
            involved: involved,
            amount: amount
        }
        addSpending(newSpending)
            .then(response => response && setSpending(response.id))
        setAddSpendingMode(false)
    }

    const onDelete = () => {
        removeSpending(spending)
            .then(response => spending === response && setSpending(""))
            .then(() => saveItem())
    }

    return <div>
        {spending && editMode ? <Button variant={"danger"}
                                        disabled={currentUser.id !== owner}
                                        onClick={onDelete}>Ausgabe Löschen</Button>
            : spending? <Button variant={"primary"} onClick={() => navigate("/spendings")}>&#10004; Ausgabe</Button>
                : !spending && addSpendingMode
                    ? <Form onSubmit={onSubmit}>
                    <Form.Control type={"number"} value={amount} placeholder={"Betrag (bsp. 1,23)"} onChange={(event) => setAmount(Number(event.target.value))}/>
                    <Button onClick={() => setAddSpendingMode(false)}>Abbrechen</Button>
                    <Button type={"submit"}>Speichern</Button>
                </Form> : !spending && !addSpendingMode && <Button disabled={currentUser.id !== owner} onClick={() => setAddSpendingMode(true)}>Ausgabe hinzufügen</Button>}
    </div>

}