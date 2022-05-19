import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./EquipmentTopView.css";

export default function EquipmentTopView() {
    return <div className={"container"}>
        <h2>Ausrüstung</h2>
        <Button variant="primary">Neue Ausrüstung</Button>
    </div>
}