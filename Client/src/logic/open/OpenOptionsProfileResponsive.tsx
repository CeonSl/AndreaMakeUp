export const openOptionsProfileResponsive = (isOpenProfile: boolean) => {
    const optionsProfile = document.getElementById('optionsPerfilResponsive') as HTMLFormElement
    if (optionsProfile) {
        if (!isOpenProfile) {
            optionsProfile.style.display = 'block'
        } else {
            optionsProfile.style.display = 'none'
        }
    }
}