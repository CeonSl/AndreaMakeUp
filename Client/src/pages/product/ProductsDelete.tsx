import { Navigate, useParams } from "react-router-dom"
import { Spinner } from "../../components/Spinner"
import { useEffect, useState } from "react"

export function ProductsDelete() {
    const { id } = useParams()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [state, setState] = useState({})
    const baseUrlServer = import.meta.env.VITE_LARAVEL_SERVER_BASE_URL
    const url = `${baseUrlServer}/api/products/${id}`

    useEffect(() => {
        fetch(url, {
            method: 'DELETE'
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setState(data)
                setShouldRedirect(true)
            })
    }, [])

    if (shouldRedirect) {
        return <Navigate to={'/products'} state={state} />
    }

    return (<></>)
}
