import stylesAddProduct from '../../css/addProduct.module.css';
import { Navigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { useFetchParams } from '../../logic/fetch/fetching/useFetchParameters';
import { useFetchCsrf } from '../../logic/fetch/fetching/useFetchCsrf';
import { AddProducts } from '../../types/Products';
import { useFetchProduct } from '../../logic/fetch/fetching/useFetchProduct';
import { Navigation } from '../../components/Navigation';
import { Spinner } from '../../components/Spinner';
import { IParams } from '../../types/Params';
import { useFetchStores } from '../../logic/fetch/fetching/useFetchStores';
import { IStores } from '../../types/Stores';
import { mapCategories } from '../../logic/mapping/mapCategories';
import { mapStores } from '../../logic/mapping/mapStores';
import { handleChangeFile } from '../../logic/HandleChangeFile';
import { Box, Button, Container, FormControl, IconButton, MenuItem, Select, Stack, TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import InputLabel from '@mui/material/InputLabel';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import OutlinedInput from '@mui/material/OutlinedInput';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL
const baseUrlServer = import.meta.env.VITE_LARAVEL_SERVER_BASE_URL
const fetchCsrf = useFetchCsrf(`${baseUrlServer}/api/csrf/products`)

function EditProduct() {

    const { id } = useParams()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [state, setState] = useState({})

    const urlProducts = `${baseUrlServer}/api/products/${id}`
    const url = `${baseUrlServer}/api/parameters-products`
    const urlStores = `${baseUrlServer}/api/stores`
    let csrfToken: string
    try {
        csrfToken = fetchCsrf.read()

    } catch (error) {
        console.log(error);
    }

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


    const { categories } = useFetchParams(url)
    const { product, loading } = useFetchProduct(urlProducts)
    const { stores } = useFetchStores(urlStores)
    const [photo, setPhoto] = useState<{ name: string, src: string | ArrayBuffer }>({ name: 'default', src: `${baseUrl}/public/img/default.png` })

    useEffect(() => {
        if (product?.img != undefined) {
            setPhoto({ name: `${product ? product.img.split('/').pop() : ''}`, src: `${baseUrlServer}/${product?.img}` })
        }
    }, [product])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            name: { value: string };
            price: { value: number };
            stock: { value: number };
            category_id: { value: number };
            store_id: { value: number };
        };
        const formDataJoin: AddProducts = {
            name: target.name.value, price: target.price.value,
            stock: target.stock.value, category_id: target.category_id.value,
            store_id: target.store_id.value, img: { filename: photo.name, data: photo.src }, state: 'Active'
        }

        fetch(urlProducts, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(formDataJoin)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                setState(data)
                console.log(data);
                setShouldRedirect(true)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (shouldRedirect) {
        return (<Navigate to='/products' state={state} />)
    }

    return (
        <>
            {(loading && photo.src != 'undefined') ? <Spinner />
                :
                <>
                    <Container>
                        <Box sx={{ boxShadow: 2, marginBottom: 11, padding: '15px 30px', marginTop: 10 }}>
                            <Box component='h3' >Actualizar producto</Box>
                            <Box component='form' onSubmit={(e) => handleSubmit(e)}>
                                {product && <>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
                                        <Button variant="contained" component="label" sx={{ bgcolor: '#D14D72', margin: 1, marginLeft: 0, ":hover": { bgcolor: '#D14D72e9' } }}>
                                            <ImageIcon sx={{ marginRight: 1 }}></ImageIcon>
                                            Subir Imagen
                                            <input hidden accept="image/*" multiple type="file" onChange={(e) => { handleChangeFile(e, setPhoto) }} />
                                        </Button>
                                    </Stack>
                                    <div className={stylesAddProduct.imgUploaded} style={{ marginLeft: 0 }}>
                                        <img src={photo.src.toString()} alt={photo.name} />
                                    </div>
                                    <label className={stylesAddProduct.photoName}><strong>Nombre de la foto: </strong>{photo.name == 'default' ? '' : photo.name}</label>
                                    <Box sx={{ padding: 1, paddingLeft: 0 }}>
                                        <TextField id="outlined-basic" name='name' defaultValue={product.name} type='text' fullWidth label="Nombre" variant="outlined" />
                                    </Box>

                                    <FormControl sx={{ m: 1, marginLeft: 0, width: 1, paddingRight: 1 }}>
                                        <InputLabel id="category_id">Categoria</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="category_id"
                                            id="category_id"
                                            name="category_id"
                                            input={<OutlinedInput label="Categoria" />}
                                            MenuProps={MenuProps}
                                            value={mapCategories(categories, product)}
                                        >
                                            {categories.map((category: IParams, index) => (
                                                <MenuItem key={index} value={category.id}>{category.description}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ padding: 1, paddingLeft: 0 }}>
                                        <TextField variant="outlined" label="Precio" defaultValue={product.price} name='price' type='number' fullWidth inputProps={{ inputMode: 'numeric', step: "0.10" }} />
                                    </Box>
                                    <Box sx={{ padding: 1, paddingLeft: 0 }}>
                                        <TextField variant="outlined" label="Cantidad" name='stock' defaultValue={product.stock} type='number' fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
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
                                            value={mapStores(stores, product)}
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
                                </>}
                            </Box>
                        </Box>
                    </Container>
                    <IconButton sx={{ position: 'fixed', left: '2%', top: '10% ', color: '#D14D72' }} href={`${baseUrl}/products`}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                </>

            }
        </ >
    )
}

export default EditProduct