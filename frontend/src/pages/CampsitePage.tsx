import AppHeader from "../components/AppHeader";
import {CarItem} from "../model/CarItem";
import {AppUser} from "../model/AppUser";
import CarOverview from "../components/CarOverview";

export type CampsitePageProps = {
    carItems: CarItem[]
    appUsers: AppUser[]
}

export default function CampsitePage({carItems, appUsers} : CampsitePageProps) {
    return <div>
        <AppHeader/>
        <CarOverview carItems={carItems} appUsers={appUsers} />
    </div>
}