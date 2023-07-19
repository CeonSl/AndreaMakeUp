import { Navigate, useParams } from "react-router-dom"
import { Spinner } from "../../components/Spinner"
import { useEffect, useState } from "react"

export function DeleteSells() {
    const { id } = useParams()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [state, setState] = useState({})
    const url = `http://127.0.0.1:8000/api/sellproducts/${id}`

    useEffect(() => {
        fetch(url, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                setState(data)
                setShouldRedirect(true)
            })
            .catch((error) => {
                console.log('ola', error);
            })
    }, [])
    
    if (shouldRedirect) {
        return <Navigate to={'/sells'} state={state} />
    }

    return (<></>)
}
