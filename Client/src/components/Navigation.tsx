import { useState } from 'react';
import { Link } from "react-router-dom";
import styles from '../css/navBar.module.css';
import { useAuthStore } from '../store/auth'
import { AppBarComponent } from './AppBar';
import { openOptionsProfile } from '../logic/open/OpenOptionsProfile';
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function Navigation() {
    // const profile: Object = useAuthStore(state => state.profile)
    const [isOpenProfile, setIsOpenProfile] = useState(false);

    const tougleProfile = () => {
        openOptionsProfile(isOpenProfile);
        setIsOpenProfile(!isOpenProfile);
    }

    return (
        <>
            <AppBar position='fixed' sx={{ bgcolor: '#D14D72', zIndex: 100 }}>
                <Toolbar>
                    <Typography component='div' sx={{ flexGrow: 1 }}>
                        <Link to='/products' style={{ textDecoration: 'none', color: '#fff' }}>Inicio</Link>
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <IconButton size='small' edge='end' color='inherit' onClick={() => tougleProfile()} aria-label='logo'>
                            <AccountCircleIcon sx={{fontSize:'32px'}} ></AccountCircleIcon>
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
            <AppBarComponent />
        </>
    )
}

