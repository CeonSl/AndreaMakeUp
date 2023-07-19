import { Navigation } from '../../components/Navigation'
import stylesAddSell from '../../css/addSell.module.css'
import { useFetchProducts } from '../../logic/fetch/fetching/useFetchProducts'
import { IProducts } from '../../types/Products'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
import { TableShoppingCart } from '../../components/TableShoppingCart'
import { ResultsSell } from '../../components/ResultsSell'
import { AddSell, AddSells } from '../../types/Sells'
import { useFetchCsrf } from '../../logic/fetch/fetching/useFetchCsrf'
import { Spinner } from '../../components/Spinner'
import { Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { deleteProduct } from '../../logic/fetch/delete/deleteProductShopping'
import { useFetchStores } from '../../logic/fetch/fetching/useFetchStores'
import { IStores } from '../../types/Stores'
import QrReaderComp from '../../components/QrReaderComp'
import TableAddSellProducts from '../../components/TableAddSellProducts'
import { productStock } from '../../logic/RecieveProduct'
import Box from '@mui/joy/Box';
import { Button, Container, Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack } from '@mui/material'
import { AddProductModal } from './modal/AddProductModal'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ChangeMode } from './modal/ChangeMode'
import CachedIcon from '@mui/icons-material/Cached';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const urlClient = import.meta.env.VITE_REACT_APP_BASE_URL;


const baseUrlServer = import.meta.env.VITE_LARAVEL_SERVER_BASE_URL;
const fetchCsrfSells = useFetchCsrf(`${baseUrlServer}/api/csrf/sellproducts`)

export function AddSell() {

    let csrfTokenSells: string

    try {
        csrfTokenSells = fetchCsrfSells.read()
    } catch (error) {
        console.log(error);
    }

    const urlProducts = `${baseUrlServer}/api/products`,
        urlSell = `${baseUrlServer}/api/sells`,
        urlSells = `${baseUrlServer}/api/sellproducts`,
        urlStores = `${baseUrlServer}/api/stores`

    const { products, loading } = useFetchProducts(urlProducts)
    const [productsShopping, setProductsShopping] = useState<IProducts[]>([])
    const [total, setTotal] = useState(0.0);
    const [modal, setModal] = useState<boolean>(false);
    const [productToAdd, setProductToAdd] = useState<IProducts | undefined>()
    const [idsProducts, setIdsProducts] = useState<number[]>([])
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)
    const [states, setState] = useState({})
    const [error, setError] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const [modalSetScan, setModalSetScan] = useState<boolean>(false)
    const [scan, setScan] = useState<boolean>(false)
    const [result, setResult] = useState<string | null>('');

    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
    const { stores } = useFetchStores(urlStores)
    const [storeId, setStoreId] = useState<number>(1)

    useEffect(() => {
        if (error !== '') {
            console.log(error);
            const messageToasty = error
            window.history.replaceState({}, document.title)
            const notify = () => toast.error(messageToasty);
            notify()
            setError('')
        }

    }, [error])

    const handleChange = () => {
        setScan(!scan);
        setModalSetScan(!modalSetScan);
    }

    const handleClick = (product: IProducts, quantity: number) => {

        const productsDataToSend: IProducts[] = [...productsShopping]
        const productToPush: IProducts = Object.assign({}, product)

        if (productStock(product.id, products) < quantity) { //find the real stock

            setError(`No hay suficientes unidades de este producto (stock: ${product.stock})`)
            return <Navigate to={'/sells/add'} state={error} />

        } else if (productsDataToSend.find((productData: IProducts) => productData.id == product.id)) {

            for (let i = 0; i < productsDataToSend.length; i++) {
                if (productsDataToSend[i].id == productToPush.id) {
                    const newQuantity: number = Number(productsDataToSend[i].stock) + Number(quantity)
                    if ((newQuantity) <= productStock(product.id, products)) {
                        productsDataToSend[i].stock = newQuantity
                    } else if ((newQuantity) > productStock(product.id, products)) {
                        setError(`Cantidad restante de ${product.name}: ${product.stock - productsDataToSend[i].stock}`)
                        return <Navigate to={'/sells/add'} state={error} />
                    }
                }
            }
            setProductsShopping([...productsDataToSend])
            putResults([...productsDataToSend])

        } else {
            productToPush.stock = quantity
            productsDataToSend.push(productToPush)
            setProductsShopping([...productsDataToSend])
            putResults([...productsDataToSend])
            fillIdsProduct(productToPush.id)
        }
    }


    const handleClickRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (productsShopping.length < 1) {
            return setError('No puedes registrar sin agregar ningun producto');
        }
        const dataProductShopping: IProducts[] = [...productsShopping]
        let sellAdd: AddSell[] = [{ total_price: 0, state: 'Active', created_at: new Date() }]
        let idsRecieve: number[] = []
        let continueAdding: boolean = false //This allow to continue the sells's adding when the (quantity, product_id, etc).
        for (let i = 0; i < productsShopping.length; i++) {
            sellAdd[i] = { total_price: 0, state: 'Active', created_at: new Date() }
            sellAdd[i].total_price = dataProductShopping[i].price * dataProductShopping[i].stock
        }
        try {
            await fetch(urlSell, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfTokenSells,
                },
                body: JSON.stringify(sellAdd),
            })
                .then(response => {
                    if (response.ok) return response.json()

                })
                .then((data) => {
                    idsRecieve = (data.Mensaje) // I'm recieving here the ids from the sells added recently
                    continueAdding = true
                }).finally(() => {
                }).catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }

        // Fill sells to adding them
        fillSellsVariable(continueAdding, idsRecieve)

    }

    const putResults = (products: IProducts[]) => {
        let plusTotal: number = 0
        products.map((product: IProducts) => {
            plusTotal += product.price * product.stock;
        })

        setTotal(plusTotal)
    }

    const fillIdsProduct = (ProductId: number) => {
        const dataIds: number[] = [...idsProducts]
        dataIds.push(ProductId);
        setIdsProducts(dataIds);
    }

    const recieveStoreId = (e: ChangeEvent<HTMLSelectElement>) => {
        setStoreId(parseInt(e.target.value));
    }

    const fillSellsVariable = (continueAdding: boolean, idsRecieve: number[]) => {
        if (continueAdding) {

            let sells: AddSells[] = [{ product_id: 0, quantity: 0, sell_id: 0, store_id: 1 }]

            const dataIdsProducts: number[] = [...idsProducts]
            const dataIdsRecieve: number[] = [...idsRecieve]

            for (let i = 0; i < productsShopping.length; i++) {
                const dataProductShoppingStock: number = productsShopping[i].stock
                sells[i] = { product_id: 0, quantity: 0, sell_id: 0, store_id: 1 }
                sells[i].product_id = dataIdsProducts[i]
                sells[i].quantity = dataProductShoppingStock
                sells[i].sell_id = dataIdsRecieve[i]
                sells[i].store_id = storeId
            }
            try {
                fetch(urlSells, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfTokenSells,
                    },
                    body: JSON.stringify(sells),
                })
                    .then(response => {
                        if (response.ok) return response.json()
                    })
                    .then((data) => {
                        setState(data)
                        setShouldRedirect(true)
                    }).catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error);
            }

            setProductsShopping([])
            setIdsProducts([])
            setTotal(0.0)
        }
    }

    const handleClickForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            quantity: { value: number };
        };


        const formDataJoin: number = target.quantity.value;
        if (productToAdd) {
            handleClick(productToAdd, formDataJoin)
            setModal(!modal)
        }
    }

    if (shouldRedirect) {
        return <Navigate to={'/sells'} state={states} />
    }

    const handleDeviceIdChange = (event: SelectChangeEvent<string>) => {
        setSelectedDeviceId(event.target.value);
    };

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

    return (
        <>
            {(loading && selectedDeviceId != '') ? <Spinner /> :
                <>
                    <Container sx={{ minWidth: "90%", maxWidth: "90%", my: 10 }}>
                        <ToastContainer position="top-center" autoClose={750} hideProgressBar={true} />
                        <ChangeMode modalSetScan={modalSetScan} setModalSetScan={setModalSetScan} scan={scan} handleChange={handleChange} />
                        <AddProductModal modal={modal} setModal={setModal} handleClickForm={handleClickForm} />
                        <Box component={"form"} onSubmit={(e) => handleClickRegister(e)}>
                            <Grid container spacing={2}>
                                <Grid item xs>
                                    <Fab size="medium" sx={{ position: "fixed", bottom: '10%', right: "5%", bgcolor: '#D14D72', ":hover": { bgcolor: '#D14D72e9' } }} onClick={() => { setModalSetScan(!modalSetScan) }} aria-label="add">
                                        <CachedIcon sx={{ color: '#ffffff' }} />
                                    </Fab>
                                    {scan ?
                                        <QrReaderComp
                                            selectedDeviceId={selectedDeviceId}
                                            handleDeviceIdChange={handleDeviceIdChange}
                                            products={products}
                                            setProductToAdd={setProductToAdd}
                                            modal={modal}
                                            setModal={setModal}
                                            setResult={setResult}
                                        />
                                        :
                                        <TableAddSellProducts
                                            setSearch={setSearch}
                                            products={products}
                                            modal={modal}
                                            setModal={setModal}
                                            setProductToAdd={setProductToAdd}
                                        />
                                    }
                                </Grid>
                                <Grid item xs>
                                    <TableShoppingCart
                                        productsShopping={productsShopping}
                                        deleteProductShopping={deleteProduct}
                                        setProductsShopping={setProductsShopping}
                                        putResults={putResults}
                                        setTotal={setTotal} />
                                    <FormControl sx={{ m: 1, marginLeft: 0, width: 1, paddingRight: 1, marginTop: 2 }}>
                                        <InputLabel id="store_id">Tienda</InputLabel>
                                        <Select
                                            labelId="store_id"
                                            fullWidth
                                            id="store_id"
                                            name="store_id"
                                            input={<OutlinedInput label="Tienda" />}
                                            MenuProps={MenuProps}
                                            required
                                            displayEmpty
                                        >
                                            {stores.map((store: IStores, index) => (
                                                <MenuItem key={index} value={store.id}>{store.address}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Stack spacing={2}>
                                        <Stack spacing={2} direction={'row'} alignContent={'center'} justifyContent={"start"} sx={{
                                            fontSize:'20px'
                                        }}>
                                            <ResultsSell total={total} productsShopping={productsShopping} />
                                        </Stack>
                                        <Button type='submit' variant="contained" sx={{ alignSelf: "center", width: 1, maxWidth: "200px", bgcolor: '#D14D72', padding: 2, ":hover": { bgcolor: '#D14D72e9' } }} endIcon={<ExitToAppIcon />}>
                                            Registrar
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <IconButton sx={{ position: 'fixed', left: '2%', top: '10% ', color: '#D14D72' }} href={`${urlClient}/sells`}>
                            <ArrowBackIcon></ArrowBackIcon>
                        </IconButton>
                    </Container>

                </>
            }
        </>
    )
}
