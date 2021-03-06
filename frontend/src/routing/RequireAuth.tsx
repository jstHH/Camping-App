import {useContext} from "react";
import {Outlet, Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";


export default function RequireAuth() {
    const {token} = useContext(AuthContext)
    return (token ? <Outlet /> : <Navigate to={"/login"} />)
}