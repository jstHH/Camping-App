import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


export default function NavBar() {
    const navigate = useNavigate()

    return <div>
        <Button variant="light" className="mr-1" onClick={() => navigate("/")}>Ausrüstung</Button>
    </div>
}