import { IStores } from "../types/Stores"

export function OptionSortStores(stores: IStores[], sort: boolean) {
    const data = stores
    let storesDataSorted: IStores[] = []
    if (sort) {
     storesDataSorted = [...data].sort((a: IStores, b: IStores) => (a.address.toLocaleLowerCase() > b.address.toLocaleLowerCase()) ? 1 : -1)
    }
    return { storesDataSorted }
}
