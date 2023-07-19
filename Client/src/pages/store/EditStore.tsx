import { Navigate, useParams } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useFetchCsrf } from '../../logic/fetch/fetching/useFetchCsrf';
import { Navigation } from '../../components/Navigation';
import { Spinner } from '../../components/Spinner';
import { useFetchStore } from '../../logic/fetch/fetching/useFetchStore';
import { AddStores } from '../../types/Stores';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const baseUrlServer = import.meta.env.VITE_LARAVEL_SERVER_BASE_URL;
const urlClient = import.meta.env.VITE_REACT_APP_BASE_URL;
const fetchCsrf = useFetchCsrf(`${baseUrlServer}/api/csrf/stores`)

function EditStore() {

    const { id } = useParams()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [state, setState] = useState({})
    const url = `${baseUrlServer}/api/stores/${id}`
    let csrfToken: string
    try {
        csrfToken = fetchCsrf.read()

    } catch (error) {
        console.log(error);
    }
    const { store, loading } = useFetchStore(url)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            address: { value: string };
        };
        const formDataJoin: AddStores = { address: target.address.value, state: 'Active' }

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(formDataJoin)
        })
            .then(response => {
                return response.json()
            })
            .then((data) => {
                // console.log(data);
                setState(data)
                setShouldRedirect(true)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (shouldRedirect) {
        return (<Navigate to='/stores' state={state} />)
    }

    return (
        <>
            {loading ? <Spinner />
                :
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 1, height: '100vh' }} >
                        <Box sx={{ boxShadow: 2, padding: '15px 30px', width: .9, maxWidth: '850px' }}>
                            <Box component='h3' >Actualizar tienda</Box>
                            <Box component='form' onSubmit={(e) => handleSubmit(e)}>
                                {store &&
                                    <>
                                        <Box sx={{ padding: 1, paddingLeft: 0 }}>
                                            <TextField id="outlined-basic" name='address' value={store.address} type='text' fullWidth label="Dirección" variant="outlined" />
                                        </Box>
                                        <Stack direction="row" spacing={2} sx={{ marginTop: 10 }}>
                                            <Button type='submit' variant="contained" size='large' sx={{ bgcolor: '#D14D72', padding: 2, ":hover": { bgcolor: '#D14D72e9' } }} endIcon={<ExitToAppIcon />}>
                                                Actualizar
                                            </Button>
                                        </Stack>
                                    </>
                                }
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

export default EditStore