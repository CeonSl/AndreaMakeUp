export default function OptionsResponsive(isOpen: boolean) {

    const navbarResponsive = document.getElementById('navbarResponsive') as HTMLFormElement
    if (isOpen) {
        navbarResponsive.style.height = "365px"
    } else {
        navbarResponsive.style.height = "57px"
    }

}