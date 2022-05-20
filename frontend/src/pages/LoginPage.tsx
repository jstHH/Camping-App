import {FormEvent, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {AuthContext} from "../context/AuthProvider";


export default function LoginPage() {
    const [loginName, setLoginName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const {login} = useContext(AuthContext)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        login({login: loginName, password: password})
    }



    return <div>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Login E-Mail Adresse</Form.Label>
                <Form.Control type="email"
                              value={loginName}
                              placeholder="E-Mail eingeben"
                              onChange={(event) => setLoginName(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Passwort</Form.Label>
                <Form.Control type="password"
                              value={password}
                              placeholder="Passwort"
                              onChange={(event) => setPassword(event.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    </div>
}