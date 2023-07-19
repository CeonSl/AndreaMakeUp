export interface ISells {
    id: number;
    quantity: number;
    sell_id: number;
    product_id: number;
    store_id: number;
    created_at: string;
}

export interface AddSells {
    sell_id: number;
    product_id: number;
    store_id: number;
    quantity: number;
}

export interface ISell {
    id: number;
    total_price: number;
}

export interface AddSell {
    total_price: number;
    state: string;
    created_at: Date;
}

export interface DateSell {
    id: number;
    total_price: number;
    state: string;
    created_at: string;
}

export interface UpdateSell {
    total_price: number | undefined;
}

export interface UpdateSells {
    store_id: number;
    quantity: number;
}