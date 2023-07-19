import { FormEvent, useState } from 'react';
import { AddParams } from '../../types/Params';
import { Navigation } from '../../components/Navigation';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { useFetchParams } from '../../logic/fetch/fetching/useFetchParameters';
import { useFetchCsrf } from '../../logic/fetch/fetching/useFetchCsrf';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const fetchCsrf = useFetchCsrf("http://127.0.0.1:8000/api/csrf/parameters")
const urlClient = import.meta.env.VITE_REACT_APP_BASE_URL;

function AddParam() {
    const urlParams = 'http://127.0.0.1:8000/api/parameters'
    let csrfToken: string
    try {
        csrfToken = fetchCsrf.read()
    } catch (error) {
        console.log(error);
    }

    const { categories, loading } = useFetchParams(urlParams)
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [state, setState] = useState({})

    const fetchAdd = (formDataJoin: AddParams) => {
        fetch(urlParams, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify(formDataJoin),
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                setState(data)
                setShouldRedirect(true)
            })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            description: { value: string };
            type: { value: string };
        };
        const formDataJoin: AddParams = { description: target.description.value, type: target.type.value, state: 'Active' }
        fetchAdd(formDataJoin)
    }

    if (shouldRedirect) {
        return <Navigate to={'/categories'} state={state} />
    }

    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 1, height: '100vh' }} >
                        <Box sx={{ boxShadow: 2, padding: '15px 30px', width: .9, maxWidth: '850px' }}>
                            <Box component='h3' >Registrar categoría</Box>
                            <Box component='form' onSubmit={(e) => handleSubmit(e)}>
                                <Box sx={{ padding: 1, paddingLeft: 0 }}>
                                    <TextField id="outlined-basic" name='type' type='text' fullWidth label="Tipo" variant="outlined" />
                                </Box>
                                <Box sx={{ padding: 1, paddingLeft: 0 }}>
                                    <TextField id="outlined-basic" name='description' type='text' fullWidth label="Descripción" variant="outlined" />
                                </Box>
                                <Stack direction="row" spacing={2} sx={{ marginTop: 10 }}>
                                    <Button type='submit' variant="contained" size='large' sx={{ bgcolor: '#D14D72', padding: 2, ":hover": { bgcolor: '#D14D72e9' } }} endIcon={<ExitToAppIcon />}>
                                        Registrar
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                    <IconButton sx={{ position: 'fixed', left: '2%', top: '10% ', color: '#D14D72' }} href={`${urlClient}/products`}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                </>
            }
        </>
    )
}

export default AddParam