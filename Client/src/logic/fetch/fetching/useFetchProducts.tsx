// import { IProducts } from "../../../types/Products";

import { useEffect, useState } from "react";
import { IProducts } from "../../../types/Products";

// function getSuspender(promise: Promise<IProducts[]>) {
//     let status = "pending";
//     let response: IProducts[];

//     const suspender = promise.then(
//         (res) => {
//             status = "success";
//             response = res
//         },
//         (err) => {
//             status = "error";
//             response = err;
//         }
//     );

//     const read = () => {
//         switch (status) {
//             case "pending":
//                 throw suspender;
//             case "error":
//                 throw response;
//             default:
//                 return response;
//         }

//     }
//     return { read };
// }

// export function useFetchProducts(url: string) {
//     const promise = fetch(url)
//         .then((response) => response.json())
//         .then((products) => products)

//     return getSuspender(promise);
// }

export function useFetchProducts(url: string) {
    const [products, setProducts] = useState<IProducts[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((response) => response.ok && response.json())
            .then((products) => setProducts(products))
            .finally(() => {
                setLoading(false)
            })
            .catch((error) => console.log(error))
    }, [])


    return { products, loading }
}