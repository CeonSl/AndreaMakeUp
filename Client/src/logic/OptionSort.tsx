import { IProducts } from "../types/Products"

export function OptionSort(products: IProducts[], sort: boolean) {
    const data = products
    let productsDataSorted: IProducts[] = []
    if (sort) {
        productsDataSorted = [...data].sort((a: IProducts, b: IProducts) => (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) ? 1 : -1)
    }
    return { productsDataSorted }
}
