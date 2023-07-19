import { useEffect, useState } from "react"
import { IStores } from "../../../types/Stores"

export function useFetchStores(url: string) {
    const [stores, setStores] = useState<IStores[]>([])
    const [loadingStore, setLoadingStore] = useState(true)

    useEffect(() => {
        setLoadingStore(true)
        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => {
                setStores(data)
            })
            .finally(() => {
                setLoadingStore(false)
            })
    }, [])

    return { stores, loadingStore }
}