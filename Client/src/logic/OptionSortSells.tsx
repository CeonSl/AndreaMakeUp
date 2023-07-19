import { ISells } from "../types/Sells"


export function OptionSortSells(sells: ISells[], sort: boolean) {
    const data = sells
    let sellsDataSorted: ISells[] = []
    if (sort) {
        sellsDataSorted = [...data].sort((a: ISells, b: ISells) => {
            const nameA = a.created_at
            const nameB = b.created_at 
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        }
        )
    }
    return { sellsDataSorted }
}
