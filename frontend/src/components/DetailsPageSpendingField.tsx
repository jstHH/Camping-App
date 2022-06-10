import {FormEvent, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {SpendingItemDTO} from "../model/SpendinItemDTO";
import {Spending} from "../model/Spending";


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
}

export default function DetailsPageSpendingField({title, itemID, itemClass, involved, owner, editMode,spending, setSpending, addSpending}: DetailsPageSpendingFieldProps) {
    const [addSpendingMode, setAddSpendingMode] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)

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

    return <div>
        {spending && editMode ? <Button variant={"danger"}>Ausgabe Löschen</Button>
            : spending? <Button variant={"primary"}>Ausgabe</Button>
                : !spending && addSpendingMode ? <Form onSubmit={onSubmit}>
                    <Form.Control type={"number"} value={amount} placeholder={"Betrag (bsp. 1,23)"} onChange={(event) => setAmount(Number(event.target.value))}/>
                    <Button>Abbrechen</Button>
                    <Button type={"submit"}>Speichern</Button>
                </Form> : !spending && !addSpendingMode && <Button onClick={() => setAddSpendingMode(true)}>Ausgabe hinzufügen</Button>}
    </div>

}