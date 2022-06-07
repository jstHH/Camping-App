import AppHeader from "../components/AppHeader";
import {CarItem} from "../model/CarItem";
import {AppUser} from "../model/AppUser";
import CarOverview from "../components/CarOverview";
import {TentItem} from "../model/TentItem";
import TentOverview from "../components/TentOverview";

export type CampsitePageProps = {
    carItems: CarItem[]
    tentItems: TentItem[]
    appUsers: AppUser[]
}

export default function CampsitePage({carItems, tentItems, appUsers} : CampsitePageProps) {
    return <div>
        <AppHeader/>
        <CarOverview carItems={carItems} appUsers={appUsers} />
        <TentOverview tentItems={tentItems} appUsers={appUsers} />
    </div>
}