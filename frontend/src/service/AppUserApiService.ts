import {AppUser} from "../model/AppUser";
import axios from "axios";


export const getCurrentAppUser: (token?: string) => Promise<AppUser> = (token) => {
    return axios.get("/user/current", token ? {headers: {"Authorization": token}}: {})
        .then(response => response.data)
}