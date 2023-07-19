import { useEffect, useState } from "react"
import { IProducts } from "../../../types/Products"

export function useFetchProduct(url: string) {
    const [product, setProducts] = useState<IProducts>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((response) => response.json())
            .then((products) => setProducts(products))
            .finally(() => {
                setLoading(false)
            })
    }, [])


    return { product, loading }
}