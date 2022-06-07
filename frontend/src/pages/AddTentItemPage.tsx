import {Omit} from "react-bootstrap/helpers";
import {TentItem} from "../model/TentItem";
import {AppUser} from "../model/AppUser";
import AddCarTentForm from "../components/AddCarTentForm";


export type AddTentItemPageProps = {
    addTentItem: (newTentItem: Omit<TentItem, "id">) => void
    currentUser: AppUser
}

export default function AddTentItemPage({addTentItem, currentUser}: AddTentItemPageProps) {

    return <div>
        <AddCarTentForm currentUser={currentUser} forCar={false} addTentItem={addTentItem} />
    </div>
}