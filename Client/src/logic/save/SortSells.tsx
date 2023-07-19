export const SaveSortSells = (sort: boolean) => {
    window.localStorage.setItem('sortSell', `${sort}`);
    console.log(window.localStorage.getItem('sortSell'));
}

export const ResetSortSells = () => {
    const existSort = window.localStorage.getItem('sortSell')
    if (existSort) {
        window.localStorage.removeItem('sortSell')
    }

}