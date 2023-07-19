import { ISell } from "../types/Sells"

export const sellRecieve = (id: number, sell: ISell[]) => {
    const sellData = sell.find((c: ISell) => c.id === id)
    if (sellData) {
        return sellData.total_price
    }
}