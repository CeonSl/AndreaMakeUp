import { useEffect } from "react"
import { IProducts } from "../types/Products"

interface ResultsSellProps {
    total: number,
    productsShopping: IProducts[]
}

export function ResultsSell({total, productsShopping }: ResultsSellProps) {

    useEffect(() => {
    }, [[productsShopping]])

    return (
        <>
            <h3>Total: </h3>
            <span style={{alignSelf:'center'}}>{total.toFixed(2)}</span>
        </>
    )
}