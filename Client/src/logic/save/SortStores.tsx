export const SaveSortStores = (sort: boolean) => {
    window.localStorage.setItem('sortStores', `${sort}`);
    console.log(window.localStorage.getItem('sortStores'));
}

export const ResetSortStores = () => {
    const existSort = window.localStorage.getItem('sortStores')
    if (existSort) {
        window.localStorage.removeItem('sortStores')
    }

}