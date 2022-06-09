import {Spending} from "../model/Spending";
import {AppUser} from "../model/AppUser";
import SpendingTopView from "./SpendingTopView";
import SpendingCardView from "./SpendingCardView";
import UserBalanceOverview from "./UserBalanceOverview";
import "./SpendingOverview.css"


export type SpendingOverviewProps = {
    spendings: Spending[]
    appUsers: AppUser[]
}

export default function SpendingOverview({spendings, appUsers}: SpendingOverviewProps) {
    return <div className={"overview"}>
        <div className={"spending"}>
            <SpendingTopView/>
            <SpendingCardView spendings={spendings} appUsers={appUsers}/>
        </div>
        <div className={"balance"}>
            <UserBalanceOverview appUsers={appUsers}/>
        </div>
    </div>
}