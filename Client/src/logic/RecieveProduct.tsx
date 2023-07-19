import { IProducts } from "../types/Products"

export const product = (id: number, products: IProducts[]) => {
    const product = products.find((c: IProducts) => c.id === id)
    if (product) {
        return product.name
    }
}

export const productPrice = (id: number | undefined, products: IProducts[]): number => {
    const product = products.find((c: IProducts) => c.id === id)
    if (product) {
        return product.price;
    }
    return 0
}

export const productStock = (id: number | undefined, products: IProducts[]): number => {
    const product = products.find((c: IProducts) => c.id === id)
    if (product) {
        return product.stock;
    }
    return 0
}