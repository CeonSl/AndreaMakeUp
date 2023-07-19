export const moveTableTrue = () => {
    const table = document.getElementById('table') as HTMLFormElement
    if (table) {
        table.style.marginLeft = '0px';


    }
}

export const moveTableFalse = () => {
    const table = document.getElementById('table') as HTMLFormElement
    if (table) {
        table.style.marginLeft = '170px';
    }
}