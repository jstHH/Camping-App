import {TentItem} from "../model/TentItem";
import {AppUser} from "../model/AppUser";
import TentTopView from "./TentTopView";
import TentItemCardView from "./TentItemCardView";


export type TentOverviewProps = {
    tentItems: TentItem[]
    appUsers: AppUser[]
}

export default function TentOverview({tentItems, appUsers}: TentOverviewProps) {
    return <div>
        <TentTopView/>
        <TentItemCardView tentItems={tentItems} appUsers={appUsers}/>
    </div>
}