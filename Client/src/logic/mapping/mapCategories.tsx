import { IParams } from "../../types/Params"
import { IProducts } from "../../types/Products"

export const mapCategories = (categories: IParams[], product: IProducts) => {
    let categoryData
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id == product?.category_id) {
            categoryData = categories[i].id
        }
    }
    return categoryData
}
