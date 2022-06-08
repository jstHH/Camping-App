import {TentItem} from "../model/TentItem";
import {AppUser} from "../model/AppUser";
import TentItemCard from "./TentItemCard";
import "./TentItemCardView.css"


export type TentItemCardViewProps = {
    tentItems: TentItem[]
    appUsers: AppUser[]
}

export default function TentItemCardView({tentItems, appUsers} : TentItemCardViewProps) {

    const getOwnerName: (tent: TentItem) => string = (tent) => {
        const tentOwner = appUsers.find(user => user.id === tent.owner)
        return (tentOwner !== undefined ? tentOwner.name : "Keiner")
    }

    return <div className={"card_container"}>
        {tentItems.length > 0 ? (tentItems.map(tent => <TentItemCard tentItem={tent} ownerName={getOwnerName(tent)}/>)): <p>Nichts da</p>}
    </div>

}