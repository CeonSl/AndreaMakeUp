import { useEffect, useState } from "react"
import { IStores } from "../../../types/Stores"

export function useFetchStore(url: string) {
    const [store, setStore] = useState<IStores>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((response) => response.json())
            .then((data) => setStore(data))
            .finally(() => {
                setLoading(false)
            })
    }, [])


    return { store, loading }
}