export const SaveSortParams = (sort: boolean) => {
    window.localStorage.setItem('sortParam', `${sort}`);
    console.log(window.localStorage.getItem('sortParam'));
}

export const ResetSortParams = () => {
    const existSort = window.localStorage.getItem('sortParam')
    if (existSort) {
        window.localStorage.removeItem('sortParam')
    }

}