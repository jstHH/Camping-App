import {useContext, useEffect, useState} from "react";
import {TentItem} from "../model/TentItem";
import {AuthContext} from "../context/AuthProvider";
import {deleteTentItem, getAllTentItems, postTentItem, putTentItem} from "../service/TentItemApiService";
import {Omit} from "react-bootstrap/helpers";
import {toast} from "react-hot-toast";


export default function useTentItems(getUpdatedSpending: (id: string) => void) {
    const [tentItems, setTentItems] = useState<TentItem[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllTentItems(token)
            .then(response => setTentItems(response))
            .catch(console.error)
    }, [token])

    const addTentItem = (newTentItem: Omit<TentItem, "id">) => {
        postTentItem(newTentItem, token)
            .then(response => setTentItems([...tentItems, response]))
            .then(() => toast.success("Neues Zelt hinzugefügt"))
            .catch(() => toast.error("Das hat nicht geklappt!"))
    }

    const updateTentItem = (changedTentItem: TentItem) => {
        putTentItem(changedTentItem, token)
            .then(response => {
                setTentItems(tentItems.map(tent => tent.id === response.id? response: tent))
                getUpdatedSpending(response.spending)
                toast.success("Zelt gespeichert")
            })
            .catch(() => toast.error("Das hat nicht geklappt!"))
    }

    const removeTentItem = (id: string) => {
        deleteTentItem(id, token)
            .then(response => setTentItems(tentItems.filter(tent => tent.id !== response)))
            .then(() => toast.success("Zelt gelöscht"))
            .catch(() => toast.error("Das hat nicht geklappt!"))
    }

    return {tentItems, addTentItem, updateTentItem, removeTentItem}
}