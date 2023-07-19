import { IProducts } from "../../types/Products"
import { IStores } from "../../types/Stores"

export const mapStores = (stores: IStores[], product: IProducts) => {
    const selectedStore = stores.find(store => store.id === product?.store_id);
    return selectedStore ? selectedStore.id : '';
}