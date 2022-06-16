import {useContext, useEffect, useState} from "react";
import {Spending} from "../model/Spending";
import {AuthContext} from "../context/AuthProvider";
import {deleleteSpendingByID, getAllSpendings, getSpendingByID, postSpending} from "../service/SpendingApiService";
import {SpendingItemDTO} from "../model/SpendinItemDTO";
import {toast} from "react-hot-toast";


export default function useSpendings() {
    const [spendings, setSpendings] = useState<Spending[]>([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        getAllSpendings(token)
            .then(response => setSpendings(response))
            .catch(console.error)
    }, [token])

    const addSpending = (newSpending: SpendingItemDTO) => {
        return postSpending(newSpending, token)
            .then(response => {
                setSpendings([...spendings, response])
                toast.success("Neue Ausgabe gespeichert")
                return response
            })
            .catch(console.error)
    }

    const getUpdatedSpending = (id: string) => {
        getSpendingByID(id, token)
            .then(response => {
                setSpendings(spendings.map(spending => spending.id === response.id ? response : spending))
                if (response.title) {
                    toast.success("Ausgabe " + response.title + " wurde angepasst")
                }
            })
            .catch(console.error)
    }

    const removeSpending = (id: string) => {
        return deleleteSpendingByID(id, token)
            .then(response => {
                setSpendings(spendings.filter(spending => spending.id !== response))
                if (response) {
                    toast.success("Ausgabe wurde gelöscht")
                }
                return response
            })
    }

    return {spendings, addSpending, getUpdatedSpending, removeSpending}
}