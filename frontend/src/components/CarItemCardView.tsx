import {CarItem} from "../model/CarItem";
import {AppUser} from "../model/AppUser";
import CarItemCard from "./CarItemCard";
import "./CarItemCardView.css"


export type CarItemCardViewProps = {
    carItems: CarItem[]
    appUsers: AppUser[]
}

export default function CarItemCardView({carItems, appUsers}: CarItemCardViewProps) {

    const getOwnerName: (car: CarItem) => string = (car) => {
        const carOwner = appUsers.find(user => user.id === car.owner)
        return (carOwner !== undefined ? carOwner.name : "Keiner")
    }

    return <div className={"card_container"}>
        {carItems.length > 0 ? (carItems.map(car => <CarItemCard carItem={car} ownerName={getOwnerName(car)}/>)) : <p>Nichts da</p>}
    </div>
}