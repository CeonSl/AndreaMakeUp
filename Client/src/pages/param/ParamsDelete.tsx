import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export function ParamsDelete() {
    const { id } = useParams()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [state, setState] = useState({})
    const url = `http://127.0.0.1:8000/api/parameters/${id}`

    useEffect(() => {
        fetch(url, {
            method: 'DELETE'
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.Error) {
                    setState(data)
                } else {
                    setState(data)
                }
                setShouldRedirect(true)
            })
    }, [])

    if (shouldRedirect) {
        return <Navigate to={'/categories'} state={state} />
    }

    return (<></>)
}
