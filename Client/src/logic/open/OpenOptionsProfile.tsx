export const openOptionsProfile = (isOpenProfile: boolean) => {
    const optionsProfile = document.getElementById('optionsPerfil') as HTMLFormElement

    if (!isOpenProfile) {
        optionsProfile.style.display = 'block'
    } else {
        optionsProfile.style.display = 'none'
    }
}