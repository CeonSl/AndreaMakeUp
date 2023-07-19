import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export function DeleteStore() {
    const { id } = useParams()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [state, setState] = useState({})
    const url = `http://127.0.0.1:8000/api/stores/${id}`

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
        return <Navigate to={'/stores'} state={state} />
    }

    return (<></>)
}
