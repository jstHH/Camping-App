import {Booking} from "./Bookings";

export type Spending = {
    id: string
    title: string
    itemID: string
    owner: string
    involved: string[]
    amount: number
    bookings: Booking[]
}