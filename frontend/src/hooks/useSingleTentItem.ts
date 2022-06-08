import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import {getSingleTentItem} from "../service/TentItemApiService";
import {TentItem} from "../model/TentItem";


export default function useSingleTentItem() {
    const [tentItem, setTentItem] = useState<TentItem>()
    const {token} = useContext(AuthContext)

    const getSingleTentItemByID = (id: string) => {
        getSingleTentItem(id, token)
            .then(response => setTentItem(response))
            .catch(console.error)
    }

    return {tentItem, getSingleTentItemByID, setTentItem}
}