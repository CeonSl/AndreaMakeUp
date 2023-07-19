
export interface IProducts {
    id: number
    name: string
    img: string
    price: number
    stock: number
    category_id: number
    store_id: number
}

export interface AddProducts {
    img: { filename: string, data: string | ArrayBuffer };
    name: string
    price: number
    stock: number
    category_id: number
    store_id: number
    state: string
}
