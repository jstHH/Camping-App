import AppHeader from "../components/AppHeader";
import {Spending} from "../model/Spending";
import {AppUser} from "../model/AppUser";
import SpendingOverview from "../components/SpendingOverview";

export type SpendingPageProps = {
    spendings: Spending[]
    appUser: AppUser[]
}

export default function SpendingPage({spendings, appUser}: SpendingPageProps) {
    return <div>
        <AppHeader/>
        <SpendingOverview spendings={spendings} appUsers={appUser} />
    </div>
}