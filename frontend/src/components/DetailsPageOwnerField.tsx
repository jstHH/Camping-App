import {Button, Form, Stack} from "react-bootstrap";


type DetailsPageOwnerFieldProps = {
    ownerName: string
}

export default function DetailsPageOwnerField({ownerName}: DetailsPageOwnerFieldProps) {
    return <div>
        <Stack direction={"horizontal"} gap={5}>
            <Form.Label>Fahrer:</Form.Label>
            <Button variant={"outline-primary"}>{ownerName}</Button>
        </Stack>
    </div>
}