import {Booking} from "./Bookings";

export type Spending = {
    id: string
    title: string
    itemID: string
    itemClass: string
    owner: string
    involved: string[]
    amount: number
    bookings: Booking[]
}