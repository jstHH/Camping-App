import {useContext, useEffect, useState} from "react";
import {Spending} from "../model/Spending";
import {AuthContext} from "../context/AuthProvider";
import {getAllSpendings} from "../service/SpendingApiService";


export default function useSpendings() {
    const [spendings, setSpendings] = useState<Spending[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllSpendings(token)
            .then(response => setSpendings(response))
            .catch(console.error)
    })


    return {spendings}
}