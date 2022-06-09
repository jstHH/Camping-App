import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function NavBar() {
    const navigate = useNavigate()

    return <div>
        <Button variant="light" onClick={() => navigate("/")}>Ausrüstung</Button>
        <Button variant="light" onClick={() => navigate("/campsite")}>Zeltplatz</Button>
        <Button variant="light" onClick={() => navigate("/spendings")}>Ausgaben</Button>
    </div>
}