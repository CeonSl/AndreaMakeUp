import styles from '../../css/dashboard.module.css';
import stylesAddProduct from '../../css/add.module.css';
import OptionsProfile from '../../components/OptionsProfile';
import { Navigate, useParams } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useFetchParams } from '../../logic/fetch/fetching/useFetchParameters';
import { useFetchCsrf } from '../../logic/fetch/fetching/useFetchCsrf';
import { Navigation } from '../../components/Navigation';
import { Spinner } from '../../components/Spinner';
import { useFetchStores } from '../../logic/fetch/fetching/useFetchStores';
import { useFetchSell } from '../../logic/fetch/fetching/useFetchSell';
import { product, productPrice } from '../../logic/RecieveProduct';
import { useFetchProducts } from '../../logic/fetch/fetching/useFetchProducts';
import { IStores } from '../../types/Stores';
import { UpdateSell, UpdateSells } from '../../types/Sells';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';


const baseUrlServer = import.meta.env.VITE_LARAVEL_SERVER_BASE_URL;
const fetchCsrf = useFetchCsrf(`${baseUrlServer}/api/csrf/sellproducts`)
const urlClient = import.meta.env.VITE_REACT_APP_BASE_URL;

function EditSells() {

    const { id } = useParams()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [state, setState] = useState({})
    const url = `${baseUrlServer}/api/sellproducts/${id}`
    const urlProducts = `${baseUrlServer}/api/products`
    const urlStores = `${baseUrlServer}/api/stores`
    let csrfToken: string
    try {
        csrfToken = fetchCsrf.read()
    } catch (error) {
        console.log(error);
    }
    const { categories } = useFetchParams(url)
    const { sell, loading, sellTotalPrice } = useFetchSell(url)
    const { products } = useFetchProducts(urlProducts);
    const urlSell = `${baseUrlServer}/api/sells/${sellTotalPrice?.id}`
    const { stores } = useFetchStores(urlStores)

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            quantity: { value: number };
            store_id: { value: number };
        };
        const formDataJoin: UpdateSell = { total_price: (productPrice(sell?.product_id, products) * target.quantity.value) }

        try {
            await fetch(urlSell, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formDataJoin),
            })
                .then(response => {
                    if (response.ok) return response.json()

                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }


        const formDataJoinSellProduct: UpdateSells = { quantity: target.quantity.value, store_id: target.store_id.value }

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(formDataJoinSellProduct)
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
            .catch((error) => {
                console.log(error);
            })
    }

    if (shouldRedirect) {
        return (<Navigate to='/sells' state={state} />)
    }
    return (
        <div className={styles.container}>
            {loading ? <Spinner />
                :
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 1, height: '100vh' }} >
                        <Box sx={{ boxShadow: 2, padding: '15px 30px', width: .9, maxWidth: '850px' }}>
                            <Box component='h3' >Actualizar venta</Box>
                            <Box component='form' onSubmit={(e) => handleSubmit(e)}>
                                {sell &&
                                    <>
                                        <Box sx={{ padding: 1, paddingLeft: 0 }}>
                                            <TextField id="outlined-basic" name='product' value={product(sell.product_id, products)} type='text' fullWidth label="Producto" variant="outlined" />
                                        </Box>
                                        <Box sx={{ padding: 1, paddingLeft: 0 }}>
                                            <TextField id="outlined-basic" name='quantity' value={sell.quantity} type='number' fullWidth label="Cantidad" variant="outlined" />
                                        </Box>
                                        <FormControl sx={{ m: 1, marginLeft: 0, width: 1, paddingRight: 1 }}>
                                            <InputLabel id="store_id">Tienda</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="store_id"
                                                id="store_id"
                                                name="store_id"
                                                input={<OutlinedInput label="Tienda" />}
                                                MenuProps={MenuProps}
                                                value={sell.store_id}
                                            >
                                                {stores.map((store: IStores, index) => (
                                                    <MenuItem key={index} value={store.id}>{store.address}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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
                    <IconButton sx={{ position: 'fixed', left: '2%', top: '10% ', color: '#D14D72' }} href={`${urlClient}/sells`}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                </>
            }
        </div >
    )
}

export default EditSells

export { }