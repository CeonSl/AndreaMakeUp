
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import styles from '../css/optionsProfile.module.css'

function OptionsProfileResponsive() {
    const logout = useAuthStore(state => state.logout)
    const navigate = useNavigate()
    return (
        <div id='optionsPerfilResponsive' className={styles.optionsProfileResponsive}>
            <button>Perfil</button>
            <button onClick={() => {
                logout()
                navigate('/login')
            }} >Cerrar Sesión</button>
        </div>
    )
}

export default OptionsProfileResponsive