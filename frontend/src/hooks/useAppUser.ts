import {useContext, useEffect, useState} from "react";
import {AppUser} from "../model/AppUser";
import {AuthContext} from "../context/AuthProvider";
import {getCurrentAppUser} from "../service/AppUserApiService";


export default function useAppUser() {
    const [appUser, setAppUser] = useState<AppUser>({balance: 0, id: "", login: "", name: ""})
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getCurrentAppUser(token)
            .then(response => setAppUser(response))
            .catch(console.error)
    },[token])

    return appUser;
}