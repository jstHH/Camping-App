import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./EquipmentTopView.css";
import {useNavigate} from "react-router-dom";

export default function EquipmentTopView() {
    const navigate = useNavigate()


    return <div className={"container"}>
        <h2>Ausrüstung</h2>
        <Button variant="primary" type="button" onClick={() => navigate("equipment/additem")}>Neue Ausrüstung</Button>
    </div>
}