import { useEffect, useState } from "react";
import { IParams } from "../../types/Params";
import { useFetchParams } from '../../logic/fetch/fetching/useFetchParameters';
import { ResetSortParams, SaveSortParams } from "../../logic/save/SortParams";
import { OptionSortParams } from "../../logic/OptionSortParams";
import { DashBoardTemp } from "../DashboardTemp";
import { useLocation } from "react-router-dom";

export function Params() {
    const [sort, setSort] = useState(
        () => {
            const sortFromStorage = window.localStorage.getItem('sortParam') //ES LENTO!!!
            return sortFromStorage == "true" ? true : false
        }
    )
    const params = useLocation()
    const urlToChange = params.pathname.split('/')[1]
    console.log(urlToChange);
    const [value, setValue] = useState(`${urlToChange}`);
    const [useCategories, setUseCategories] = useState<IParams[]>([])
    const url = 'http://127.0.0.1:8000/api/parameters'
    const { categories, loading } = useFetchParams(url)
    const { paramsDataSorted } = OptionSortParams([...categories], sort)

    useEffect(() => {
        setValue(`${url}`)
    }, [url])

    return (
        <>
            <DashBoardTemp
                sort={sort}
                setSort={setSort}
                categories={categories}
                categoriesDataSorted={paramsDataSorted}
                loading={loading}
                typeSort={SaveSortParams}
                resetTypeSort={ResetSortParams}
                useCategories={useCategories}
                setUseCategories={setUseCategories} />
        </>
    )
}