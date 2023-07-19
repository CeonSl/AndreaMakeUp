import { useState } from "react";
import { useFetchProducts } from "../../logic/fetch/fetching/useFetchProducts";
import { ResetSortSells, SaveSortSells } from "../../logic/save/SortSells";
import { useFetchSells } from "../../logic/fetch/fetching/useFetchSells";
import { OptionSortSells } from "../../logic/OptionSortSells";
import { ISells } from "../../types/Sells";
import { DashBoardTemp } from "../DashboardTemp";
import { useFetchStores } from "../../logic/fetch/fetching/useFetchStores";

export function Sells() {
    const [useSells, setUseSells] = useState<ISells[]>([])
    const [sort, setSort] = useState(
        () => {
            const sortFromStorage = window.localStorage.getItem('sortSell') //ES LENTO!!!
            return sortFromStorage == "true" ? true : false
        }
    )
    const urlProducts = 'http://127.0.0.1:8000/api/products'
    const urlSell = 'http://127.0.0.1:8000/api/sellproducts'
    const urlStore = 'http://127.0.0.1:8000/api/stores'
    const { products } = useFetchProducts(urlProducts)
    const { sellTotalPrice, sell, sellDate } = useFetchSells(urlSell)
    const { sellsDataSorted } = OptionSortSells(sell, sort);
    const { stores, loadingStore } = useFetchStores(urlStore)

    return (
        <>
            <DashBoardTemp
                sort={sort}
                setSort={setSort}
                sells={sell}
                sellsDataSorted={sellsDataSorted}
                loading={loadingStore}
                typeSort={SaveSortSells}
                resetTypeSort={ResetSortSells}
                useSells={useSells}
                setUseSells={setUseSells}
                sellDate={sellDate}
                sellTotalPrice={sellTotalPrice}
                products={products}
                stores={stores}
            />
        </>
    )
}