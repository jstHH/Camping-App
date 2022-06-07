import {useContext, useEffect, useState} from "react";
import {CarItem} from "../model/CarItem";
import {AuthContext} from "../context/AuthProvider";
import {deleteCarItem, getAllCarItems, postCarItem, putCarItem} from "../service/CarItemApiService";
import {Omit} from "react-bootstrap/helpers";


export default function useCarItems() {
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
            .catch(console.error)
    }

    const updateCarItem = (changedCarItem: CarItem) => {
        putCarItem(changedCarItem, token)
            .then(response => setCarItems(carItems.map(car => car.id === response.id ? response:car)))
            .catch(console.error)
    }

    const removeCarItem = (carItemID: string) => {
        deleteCarItem(carItemID, token)
            .then(response => setCarItems(carItems.filter(car => car.id !== response)))
            .catch(console.error)
    }

    return {carItems, addCarItem, updateCarItem, removeCarItem}

}