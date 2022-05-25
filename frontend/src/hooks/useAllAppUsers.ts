import {useContext, useEffect, useState} from "react";
import {AppUser} from "../model/AppUser";
import {AuthContext} from "../context/AuthProvider";
import {getAllAppUsers} from "../service/AppUserApiService";


export default function useAllAppUsers() {
    const [appUsers, setAppUsers] = useState<AppUser[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllAppUsers(token)
            .then(response => setAppUsers(response))
            .catch(console.error)
    },[token])

    return appUsers;
}