import {useContext, useEffect, useState} from "react";
import {Spending} from "../model/Spending";
import {AuthContext} from "../context/AuthProvider";
import {getAllSpendings, getSpendingByID, postSpending} from "../service/SpendingApiService";
import {SpendingItemDTO} from "../model/SpendinItemDTO";


export default function useSpendings() {
    const [spendings, setSpendings] = useState<Spending[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllSpendings(token)
            .then(response => setSpendings(response))
            .catch(console.error)
    })

    const addSpending = (newSpending: SpendingItemDTO) => {
        return postSpending(newSpending, token)
            .then(response => {
                setSpendings([...spendings, response])
                return response
            })
            .catch(console.error)
    }

    const getUpdatedSpending = (id: string) => {
        getSpendingByID(id)
            .then(response => setSpendings(spendings.map(spending => spending.id === response.id ? response : spending)))
            .catch(console.error)
    }

    return {spendings, addSpending, getUpdatedSpending}
}