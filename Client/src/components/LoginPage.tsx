import {  useState } from 'react'
import { Alert, Button,  ThemeProvider, Typography, Zoom, createTheme } from '@mui/material'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import BrushIcon from '@mui/icons-material/Brush';
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField/TextField';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import FormControl from '@mui/material/FormControl/FormControl';
import { TransitionGroup } from 'react-transition-group';
import { theme } from '../types/theme';

interface props {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    error: { errors: [] }
}
export default function LoginPage({ handleSubmit, error }: props) {
    const [showPassword, setShowPassword] = useState(false);
    console.log(error);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ height: '100vh', width: '100%', background: 'linear-gradient(90deg, #D14D72 20%, #fff 80%)' }}>
                <Container component="main" maxWidth="sm" sx={{ height: '100vh' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Box  sx={{ marginTop: 20, background: '#fff', boxShadow: 3, padding: 5 }}>
                            <Box  component='div' sx={{ width: 1, display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                <Avatar sx={{ bgcolor: '#D14D72', width: '60px', height: '60px' }}>
                                    <BrushIcon sx={{ fontSize: '40px' }} />
                                </Avatar>
                            </Box>
                            <Typography component='h1' variant='h3'
                                sx={{
                                    fontWeight: '800',
                                    textAlign: 'center',
                                    fontSize: 40
                                }}>Iniciar Sesión</Typography>

                            <Box component='div' id='errors'>
                                <TransitionGroup>
                                    {
                                        (error && Array.isArray(error.errors) && error.errors.length > 0) &&
                                        (error.errors).map((er) => (
                                            <Zoom mountOnEnter unmountOnExit>
                                                <Box sx={{ my: 1 }}>
                                                    <Alert severity="error">{er}</Alert>
                                                </Box>
                                            </Zoom>

                                        ))
                                    }
                                </TransitionGroup>
                            </Box>
                            <Box component='form' onSubmit={handleSubmit} sx={{
                                '& > :not(style)': { my: 2, width: 1 },
                            }}
                            >
                                <TextField fullWidth type="email" id='email' name='email' label='Correo' sx={{
                                    display: 'block'
                                }}></TextField>
                                <FormControl sx={{ width: 1, display: 'block' }} variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Contraseña"
                                        fullWidth
                                    />
                                </FormControl>
                                <Button variant='contained' fullWidth type='submit' >
                                    Ingresar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}