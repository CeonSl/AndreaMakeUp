import { useEffect, useState } from "react"
import { useFetchCsrf } from "./fetch/fetching/useFetchCsrf";

const baseUrlServer = import.meta.env.VITE_LARAVEL_SERVER_BASE_URL;
const fetchCsrfSells = useFetchCsrf(`${baseUrlServer}/api/csrf/sellproducts`)
export function useFetchGetNewSells(month:number, year:number) {

    let csrfTokenSells: string

    try {
        csrfTokenSells = fetchCsrfSells.read()
    } catch (error) {
        console.log(error);
    }
    const [newSellsRecieved, setNewSellsRecieved] = useState<number>();
    const [loading, setLoading] = useState(true)
    const sendData = {month: month, year: year}
    useEffect(() => {
        setLoading(true)
        fetch("http://127.0.0.1:8000/api/get-new-sells/sellproducts", {
            method:'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfTokenSells,
            },
        })
            .then((response) => response.json())
            .then((data) => setNewSellsRecieved(data))
            .finally(() => {
                setLoading(false)
            })
    }, [])
    return {newSellsRecieved}
}