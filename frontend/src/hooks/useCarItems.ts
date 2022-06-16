import {useContext, useEffect, useState} from "react";
import {CarItem} from "../model/CarItem";
import {AuthContext} from "../context/AuthProvider";
import {deleteCarItem, getAllCarItems, postCarItem, putCarItem} from "../service/CarItemApiService";
import {Omit} from "react-bootstrap/helpers";
import {toast} from "react-hot-toast";


export default function useCarItems(getUpdatedSpending: (id: string) => void) {
    const [carItems, setCarItems] = useState<CarItem[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllCarItems(token)
            .then(response => setCarItems(response))
            .catch(console.error)
    }, [token])

    const addCarItem = (newCarItem: Omit<CarItem, "id">) => {
        postCarItem(newCarItem, token)
            .then(response => setCarItems([...carItems, response]))
            .then(() => toast.success("Neues Auto hinzugefügt"))
            .catch(() => toast.error("Das hat nicht geklappt!"))
    }

    const updateCarItem = (changedCarItem: CarItem) => {
        putCarItem(changedCarItem, token)
            .then(response => {
                setCarItems(carItems.map(car => car.id === response.id ? response:car))
                getUpdatedSpending(response.spending)
                toast.success("Auto gespeichert")})
            .catch(() => toast.error("Das hat nicht geklappt!"))
    }

    const removeCarItem = (carItemID: string) => {
        deleteCarItem(carItemID, token)
            .then(response => setCarItems(carItems.filter(car => car.id !== response)))
            .then(() => toast.success("Auto gelöscht"))
            .catch(() => toast.error("Das hat nicht geklappt!"))
    }

    return {carItems, addCarItem, updateCarItem, removeCarItem}

}