import {useContext, useEffect, useState} from "react";
import {AppUser} from "../model/AppUser";
import {AuthContext} from "../context/AuthProvider";
import {getAllAppUsers} from "../service/AppUserApiService";
import {Spending} from "../model/Spending";
import {CarItem} from "../model/CarItem";
import {TentItem} from "../model/TentItem";


export default function useAllAppUsers(allSpendings : Spending[], allCars : CarItem[], allTents : TentItem[]) {
    const [appUsers, setAppUsers] = useState<AppUser[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllAppUsers(token)
            .then(response => setAppUsers(response))
            .catch(console.error)
    },[token, allSpendings, allCars, allTents])


    return appUsers;
}
