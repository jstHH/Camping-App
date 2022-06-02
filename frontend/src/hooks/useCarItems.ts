import {useContext, useEffect, useState} from "react";
import {CarItem} from "../model/CarItem";
import {AuthContext} from "../context/AuthProvider";
import {getAllCarItems, postCarItem} from "../service/CarItemApiService";
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

    return {carItems}

}