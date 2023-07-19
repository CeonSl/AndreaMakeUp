import { Dispatch, SetStateAction } from "react";
import { IProducts } from "../../../types/Products";

export const deleteProduct = (product: IProducts, productsShopping: IProducts[],
    setProductsShopping: Dispatch<SetStateAction<IProducts[]>>, setTotal: Dispatch<SetStateAction<number>>,
    putResults: (products: IProducts[]) => void) => {
    const productsShoppingData = [...productsShopping]
    for (let i = 0; i < productsShoppingData.length; i++) {
        if (product.id == productsShoppingData[i].id) {
            productsShoppingData.splice(i, 1)
            setProductsShopping(productsShoppingData)
            if (productsShoppingData.length < 1) {
                setTotal(0.0);
            } else {
                putResults([...productsShoppingData])
            }

        }
    }
}