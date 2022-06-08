import {useContext, useEffect, useState} from "react";
import {TentItem} from "../model/TentItem";
import {AuthContext} from "../context/AuthProvider";
import {getAllTentItems} from "../service/TentItemApiService";


export default function useTentItems() {
    const [tentItems, setTentItems] = useState<TentItem[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllTentItems(token)
            .then(response => setTentItems(response))
            .catch(console.error)
    })

    return {tentItems}
}