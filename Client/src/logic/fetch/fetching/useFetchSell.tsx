import { useEffect, useState } from "react"
import { DateSell, ISell, ISells } from "../../../types/Sells"

export function useFetchSell(urlSell: string) {
    const [sellTotalPrice, setSellTotalPrice] = useState<ISell>()
    const [sellDate, setSellDate] = useState<DateSell>()
    const [sell, setSell] = useState<ISells>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch(urlSell)
            .then((response) => response.json())
            .then((sell) => {
                setSell(sell[0])
                setSellTotalPrice(sell[1])
                setSellDate(sell[1])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])


    return { sellTotalPrice, sellDate, sell, loading }
}