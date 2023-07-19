import { useEffect, useState } from "react";
import { IParams } from "../../../types/Params";

export function useFetchParams(url: string) {
    const [categories, setCategories] = useState<IParams[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => {
                    setCategories(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { categories, loading }
}

