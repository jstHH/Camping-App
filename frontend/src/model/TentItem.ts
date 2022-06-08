export type TentItem = {
    id: string
    title: string
    description: string
    owner: string
    involved : string[]
    spending ?: string
    capacity: number
    shelter: boolean
}