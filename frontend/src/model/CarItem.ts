export type CarItem = {
    id?: string
    title: string
    description: string
    owner: string
    involved : string[]
    spending ?: string
    capacity: number
    trailer: boolean
    startLocation: string
}