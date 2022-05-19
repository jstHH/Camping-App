import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function NavBar() {
    const navigate = useNavigate()

    return <div>
        <Button variant="light" className="mr-1" onClick={() => navigate("/")}>Ausrüstung</Button>
    </div>
}