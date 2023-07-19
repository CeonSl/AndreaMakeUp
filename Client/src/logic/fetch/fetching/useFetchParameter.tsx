import { useEffect, useState } from "react";
import { IParams } from "../../../types/Params";

export function useFetchParam(url: string) {
    const [category, setCategory] = useState<IParams>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => {
                console.log(data);
                setCategory(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { category, loading }
}

