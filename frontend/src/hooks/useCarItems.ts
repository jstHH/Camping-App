import {useContext, useEffect, useState} from "react";
import {CarItem} from "../model/CarItem";
import {AuthContext} from "../context/AuthProvider";
import {getAllCarItems} from "../service/CarItemApiService";


export default function useCarItems() {
    const [carItems, setCarItems] = useState<CarItem[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllCarItems(token)
            .then(response => setCarItems(response))
            .catch(console.error)
    }, [token])

    return {carItems}

}