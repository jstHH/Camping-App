import {CarItem} from "../model/CarItem";
import {AppUser} from "../model/AppUser";
import CarTopView from "./CarTopView";
import CarItemCardView from "./CarItemCardView";


export type CarOverviewProps = {
    carItems: CarItem[]
    appUsers: AppUser[]
}

export default function CarOverview({carItems, appUsers} : CarOverviewProps) {
    return <div>
        <CarTopView/>
        <CarItemCardView appUsers={appUsers} carItems={carItems}/>
    </div>

}