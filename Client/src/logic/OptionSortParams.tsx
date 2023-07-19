import { IParams } from "../types/Params"

export function OptionSortParams(params: IParams[], sort: boolean) {
    const data = params
    let paramsDataSorted: IParams[] = []
    if (sort) {
        paramsDataSorted = [...data].sort((a: IParams, b: IParams) => (a.description.toLocaleLowerCase() > b.description.toLocaleLowerCase()) ? 1 : -1)
    }
    return { paramsDataSorted }
}
