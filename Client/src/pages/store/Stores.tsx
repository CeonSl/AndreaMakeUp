import { useState } from "react";
import { DashBoardTemp } from "../DashboardTemp";
import { IStores } from "../../types/Stores";
import { useFetchStores } from "../../logic/fetch/fetching/useFetchStores";
import { OptionSortStores } from "../../logic/OptionSortStores";
import { ResetSortStores, SaveSortStores } from "../../logic/save/SortStores";

export function Stores() {
    const [sort, setSort] = useState(
        () => {
            const sortFromStorage = window.localStorage.getItem('sortStores') //ES LENTO!!!
            return sortFromStorage == "true" ? true : false
        }
    )
    const [useStores, setUseStores] = useState<IStores[]>([])
    const url = 'http://127.0.0.1:8000/api/stores'
    const { stores, loadingStore } = useFetchStores(url)
    const { storesDataSorted } = OptionSortStores([...stores], sort)

    return (
        <>
            <DashBoardTemp
                sort={sort}
                setSort={setSort}
                loading={loadingStore}
                typeSort={SaveSortStores}
                resetTypeSort={ResetSortStores}
                useStores={useStores}
                setUseStores={setUseStores}
                storesDataSorted={storesDataSorted}
                stores={stores}
            />
        </>
    )
}