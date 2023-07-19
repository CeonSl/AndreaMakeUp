import { IParams } from "../types/Params"

export const category = (id: number, categories: IParams[]) => {
    const category = categories.find((c: IParams) => c.id === id)
    if (category) {
        return category.description
    }
}