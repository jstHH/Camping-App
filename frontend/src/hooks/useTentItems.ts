import {useContext, useEffect, useState} from "react";
import {TentItem} from "../model/TentItem";
import {AuthContext} from "../context/AuthProvider";
import {getAllTentItems, postTentItem} from "../service/TentItemApiService";
import {Omit} from "react-bootstrap/helpers";


export default function useTentItems() {
    const [tentItems, setTentItems] = useState<TentItem[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllTentItems(token)
            .then(response => setTentItems(response))
            .catch(console.error)
    })

    const addTentItem = (newTentItem: Omit<TentItem, "id">) => {
        postTentItem(newTentItem, token)
            .then(response => setTentItems([...tentItems, response]))
            .catch(console.error)
    }

    return {tentItems, addTentItem}
}