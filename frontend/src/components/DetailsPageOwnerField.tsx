import {Button, Form, Stack} from "react-bootstrap";


type DetailsPageOwnerFieldProps = {
    ownerName: string
    forCar: boolean
}

export default function DetailsPageOwnerField({ownerName, forCar}: DetailsPageOwnerFieldProps) {
    return <div>
        <Stack direction={"horizontal"} gap={5}>
            <Form.Label>{forCar? "Fahrer:" : "Besitzer:"}</Form.Label>
            <Button variant={"outline-primary"}>{ownerName}</Button>
        </Stack>
    </div>
}