import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import styles from '../css/optionsProfile.module.css'
import { Button, Divider, Paper } from '@mui/material'

function OptionsProfile() {
    const logout = useAuthStore(state => state.logout)
    const navigate = useNavigate()
    return (
        <Paper sx={{
            position: 'absolute',
            top: 70,
            right: 10,
            width: "200px",
            height: "100px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <Button sx={{ marginBottom: .5, color: '#000', fontSize: 12, fontWeight: '400', textTransform: 'capitalize' }}>
                Perfil
            </Button>
            <Divider />
            <Button sx={{ marginTop: 1, color: '#000', fontSize: 12, fontWeight: '400', textTransform: 'capitalize' }} onClick={() => {
                logout()
                navigate('/login')
            }}>
                Logout
            </Button>
        </Paper>

    )
}

export default OptionsProfile