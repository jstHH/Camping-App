import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./NavBar.css"



export default function NavBar() {
    const navigate = useNavigate()

    return <div className={"navbar_container"}>
        <Button variant="secondary" onClick={() => navigate("/")}>Dashboard</Button>
        <Button variant="secondary" onClick={() => navigate("/equipment")}>Ausrüstung</Button>
        <Button variant="secondary" onClick={() => navigate("/campsite")}>Zeltplatz</Button>
        <Button variant="secondary" onClick={() => navigate("/spendings")}>Ausgaben</Button>
    </div>
}