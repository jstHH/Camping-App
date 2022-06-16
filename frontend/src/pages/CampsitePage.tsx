import AppHeader from "../components/AppHeader";
import {CarItem} from "../model/CarItem";
import {AppUser} from "../model/AppUser";
import CarOverview from "../components/CarOverview";
import {TentItem} from "../model/TentItem";
import TentOverview from "../components/TentOverview";
import "./CampsitePage.css"

export type CampsitePageProps = {
    carItems: CarItem[]
    tentItems: TentItem[]
    appUsers: AppUser[]
}

export default function CampsitePage({carItems, tentItems, appUsers}: CampsitePageProps) {
    return <div className={"page_container"}>
        <AppHeader/>
        <div className={"campsite"}>
            <CarOverview carItems={carItems} appUsers={appUsers}/>
            <TentOverview tentItems={tentItems} appUsers={appUsers}/>
        </div>
    </div>
}