import {useContext, useEffect, useState} from "react";
import {AppUser} from "../model/AppUser";
import {AuthContext} from "../context/AuthProvider";
import {getAllAppUsers} from "../service/AppUserApiService";
import {Spending} from "../model/Spending";


export default function useAllAppUsers(allSpendings: Spending[]) {
    const [appUsers, setAppUsers] = useState<AppUser[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllAppUsers(token)
            .then(response => setAppUsers(response))
            .catch(console.error)
    },[token, allSpendings])


    return appUsers;
}