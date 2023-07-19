
export const moveAddProductTrue = () => {
    const table = document.getElementById('tableAddProduct') as HTMLFormElement
    if (table) {
        table.style.marginLeft = '0px'
    }

}

export const moveAddProductFalse = () => {
    const table = document.getElementById('tableAddProduct') as HTMLFormElement
    if (table) {
        table.style.marginLeft = '135px'
    }

}