import { useState } from "react";
import { useFetchProducts } from "../../logic/fetch/fetching/useFetchProducts";
import { useFetchParams } from '../../logic/fetch/fetching/useFetchParameters';
import { OptionSort } from "../../logic/OptionSort";
import { ResetSortProducts, SaveSortProducts } from "../../logic/save/SortProduct";
import { IProducts } from "../../types/Products";
import { DashBoardTemp } from "../DashboardTemp";
import { useFetchStores } from "../../logic/fetch/fetching/useFetchStores";

export function DashBoard() {
    const [sort, setSort] = useState(
        () => {
            const sortFromStorage = window.localStorage.getItem('sortProduct') //ES LENTO!!!
            return sortFromStorage == "true" ? true : false
        }
    )
    const url = 'http://127.0.0.1:8000/api/parameters-products'
    const urlProducts = 'http://127.0.0.1:8000/api/products'
    const urlStores = 'http://127.0.0.1:8000/api/stores'
    const { categories } = useFetchParams(url)
    const { products } = useFetchProducts(urlProducts)
    const { productsDataSorted } = OptionSort([...products], sort)
    const [useProducts, setUseProducts] = useState<IProducts[]>([])
    const { stores, loadingStore } = useFetchStores(urlStores)
    

    return (
        <>
            <DashBoardTemp
                sort={sort}
                setSort={setSort}
                products={products}
                categories={categories}
                productsDataSorted={productsDataSorted}
                loading={loadingStore}
                typeSort={SaveSortProducts}
                resetTypeSort={ResetSortProducts}
                useProducts={useProducts}
                setUseProducts={setUseProducts}
                stores={stores}
            />
        </>
    )
}