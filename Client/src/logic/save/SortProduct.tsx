export const SaveSortProducts = (sort: boolean) => {
    window.localStorage.setItem('sortProduct', `${sort}`);
    console.log(window.localStorage.getItem('sortProduct'));
}

export const ResetSortProducts = () => {
    const existSort = window.localStorage.getItem('sortProduct')
    if (existSort) {
        window.localStorage.removeItem('sortProduct')
    }

}