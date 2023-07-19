import { IStores } from "../types/Stores"

export const store = (id: number, stores: IStores[]) => {

    const store = stores.find((c: IStores) => c.id === id)
    if (store) {
        return store.address
    }
}