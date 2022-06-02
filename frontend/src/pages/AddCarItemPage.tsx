import {Omit} from "react-bootstrap/helpers";
import {CarItem} from "../model/CarItem";
import {AppUser} from "../model/AppUser";
import AddCarTentForm from "../components/AddCarTentForm";


export type AddCarItemPageProps = {
    addCarItem: (newCarItem: Omit<CarItem, "id">) => void
    currentUser: AppUser | undefined
}

export default function AddCarItemPage({addCarItem, currentUser}: AddCarItemPageProps) {

    return <div>
        <AddCarTentForm currentUser={currentUser} forCar={true} addCarItem={addCarItem} />
    </div>
}