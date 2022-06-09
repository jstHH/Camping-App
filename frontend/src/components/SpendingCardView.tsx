import {Spending} from "../model/Spending";
import {AppUser} from "../model/AppUser";
import SpendingCard from "./SpendingCard";
import "./SpendingCardView.css"


export type SpendingCardViewProps = {
    spendings: Spending[]
    appUsers: AppUser []
}

export default function SpendingCardView({spendings, appUsers}: SpendingCardViewProps) {


    return <div className={"card_container"}>
        {spendings.length > 0 ? (spendings.map(spending => <SpendingCard spending={spending} appUsers={appUsers}/>)): <p>Nichts da</p>}
    </div>
}