import {Button, Form} from "react-bootstrap";


type DetailsPageTextFormProps = {
    title:string
    setTitle: (text:string) => void
    description: string
    setDescription: (text:string) => void
    startlocation?: string
    setStartLocation?: (text:string) => void
    forCar: boolean
    trailer?: boolean
    shelter?: boolean
    editMode: boolean
}

export default function DetailsPageTextForm({title, setTitle, description, setDescription, startlocation, setStartLocation, forCar, trailer, editMode}: DetailsPageTextFormProps) {
    return <div>
        <Form>
            <Form.Group>
                <Form.Label>Bezeichnung</Form.Label>
                <Form.Control type="text" value={title} disabled={!editMode} onChange={event => setTitle(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Anmerkungen</Form.Label>
                {trailer && <Button variant={"outline-info"}>Anhänger</Button>}
                <Form.Control as={"textarea"} rows={5} value={description} disabled={!editMode} onChange={(event) => setDescription(event.target.value)}/>
            </Form.Group>
            {forCar && setStartLocation && <Form.Group>
                <Form.Label>Startet Wo?</Form.Label>
                <Form.Control type="text" value={startlocation} disabled={!editMode} onChange={event => setStartLocation(event.target.value)}/>
            </Form.Group>}
        </Form>

    </div>
}