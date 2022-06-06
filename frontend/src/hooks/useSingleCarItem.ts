import {useContext, useState} from "react";
import {CarItem} from "../model/CarItem";
import {AuthContext} from "../context/AuthProvider";
import {getCarItembyID} from "../service/CarItemApiService";


export default function useSingleCarItem() {
    const [carItem, setCarItem] = useState<CarItem>()
    const {token} = useContext(AuthContext)

    const getSingleCarItemByID = (id: string) => {
        getCarItembyID(id, token)
            .then(response => setCarItem(response))
            .catch(console.error)
    }

    return {carItem, getSingleCarItemByID, setCarItem}
}