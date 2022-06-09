import {Spending} from "../model/Spending";
import {AppUser} from "../model/AppUser";
import SpendingTopView from "./SpendingTopView";
import SpendingCardView from "./SpendingCardView";


export type SpendingOverviewProps = {
    spendings: Spending[]
    appUsers: AppUser[]
}

export default function SpendingOverview({spendings, appUsers}: SpendingOverviewProps) {
    return <div>
        <SpendingTopView/>
        <SpendingCardView spendings={spendings} appUsers={appUsers} />
    </div>
}