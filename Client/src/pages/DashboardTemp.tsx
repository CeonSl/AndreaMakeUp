import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from '../css/dashboard.module.css'
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IParams } from "../types/Params";
import { IProducts } from "../types/Products";
import { Spinner } from "../components/Spinner";
import { Navigation } from "../components/Navigation";
import OptionsProfile from "../components/OptionsProfile";
import Search from "../components/Search";
import { Table } from "../components/Table";
import { DateSell, ISell, ISells } from "../types/Sells";
import { TableParams } from "../components/TableParams";
import { TableSells } from "../components/TableSells";
import { IStores } from "../types/Stores";
import { TableStores } from "../components/TableStores";
import { Box, Checkbox, Container, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { store } from "../logic/RecieveStore";

interface props {
    sort: boolean,
    setSort: Dispatch<SetStateAction<boolean>>,
    categories?: IParams[],
    categoriesDataSorted?: IParams[],
    products?: IProducts[],
    loading: boolean,
    productsDataSorted?: IProducts[],
    sells?: ISells[],
    sellsDataSorted?: ISells[],
    useSells?: ISells[],
    setUseSells?: Dispatch<SetStateAction<ISells[]>>,
    sellDate?: DateSell[],
    sellTotalPrice?: ISell[],
    typeSort: (sort: boolean) => void,
    resetTypeSort: () => void,
    useProducts?: IProducts[],
    setUseProducts?: Dispatch<SetStateAction<IProducts[]>>,
    useCategories?: IParams[],
    setUseCategories?: Dispatch<SetStateAction<IParams[]>>,
    stores?: IStores[],
    storesDataSorted?: IStores[],
    useStores?: IStores[],
    setUseStores?: Dispatch<SetStateAction<IStores[]>>
}

export function DashBoardTemp({ sort, setSort, categories, products,
    loading, productsDataSorted, typeSort, resetTypeSort,
    useProducts, setUseProducts, useCategories, setUseCategories,
    categoriesDataSorted, sells, sellsDataSorted, useSells,
    setUseSells, sellDate, sellTotalPrice, stores, storesDataSorted,
    useStores, setUseStores }: props) {

    const [message, setMessage] = useState(null)
    const [search, setSearch] = useState<string>('')
    const [storeName, setStoreName] = useState<string[]>([]);
    const { state } = useLocation()
    const messageData = state?.Error ? state?.Error : state?.Mensaje;


    const changeSort = () => {
        setSort(!sort)
    }

    useEffect(() => {
        if (stores) {
            let putStore: string = ''
            let sendStoresInitialized: string[] = []
            stores?.map((store: IStores) => {
                putStore += store.address + ','
            })
            if (putStore.split(',').length > stores!.length) {
                sendStoresInitialized = putStore.split(',')
                sendStoresInitialized.pop()
            }
            setStoreName(sendStoresInitialized);
        }
    }, [stores])


    useEffect(() => {
        if (messageData) {
            setMessage(messageData)
            window.history.replaceState({}, document.title)
            const notify = () => toast.success(message);
            notify()
        }

    }, [message])

    useEffect(() => {
        if (sort) {
            typeSort(sort)
        } else {
            resetTypeSort()
        }
    }, [sort])

    useEffect(() => {
        if (products && setUseProducts) {
            const dataToPut: IProducts[] = products.filter(
                product => product.name.toLowerCase().includes(search.toLowerCase())
            )
            setUseProducts(dataToPut)
        } else if (categories && setUseCategories) {
            const dataToPut = categories.filter(
                category => category.description.toLowerCase().includes(search.toLowerCase())
            )
            setUseCategories(dataToPut)
        } else if (stores && setUseStores) {
            const dataToPut = stores.filter(
                store => store.address.toLowerCase().includes(search.toLowerCase())
            )
            setUseStores(dataToPut)
        }
    }, [search])

    useEffect(() => {
        if (products && setUseProducts) {
            const dataToPut: IProducts[] = products.filter(
                product => {
                    if (product && product.store_id) {
                        const storeData = store(product.store_id, stores!)
                        return storeData && storeName.includes(storeData)
                    }
                    return false;
                }
            )
            setUseProducts(dataToPut)

        } else if (sells && setUseSells) {
            const dataToPut: ISells[] = sells.filter(
                sell => {
                    if (sell && sell.store_id) {
                        const storeData = store(sell.store_id, stores!)
                        return storeData && storeName.includes(storeData)
                    }
                    return false;
                }
            )
            setUseSells(dataToPut)
        }
    }, [storeName])

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

    const handleChange = (event: SelectChangeEvent<typeof storeName>) => {
        const {
            target: { value },
        } = event;
        setStoreName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <Box sx={{ marginTop: 10, padding: 1, fontSize: '0.85rem' }}>
                        {
                            (products && productsDataSorted) &&
                            <Link to="/products/add" className={styles.add} id='add'>Agregar</Link>
                        }
                        {
                            (categories && categoriesDataSorted) &&
                            <Link to="/categories/add" className={styles.add} id='add'>Agregar</Link>
                        }
                        {
                            (sells && sellsDataSorted) &&
                            <Link to="/sells/add" className={styles.add} id='add'>Agregar</Link>
                        }
                        {
                            (stores && storesDataSorted) &&
                            <Link to="/stores/add" className={styles.add} id='add'>Agregar</Link>
                        }
                        <Box sx={{ marginLeft: 1 }}>
                            <div className={styles.containerSearchExportsSort} id='containerSearchExportsSort'>
                                <Search setSearch={setSearch} />
                                <div className={styles.containerCheckBox} id='sortContainer'>


                                    {(!sells && !sellsDataSorted) &&
                                        <>
                                            <input type="checkbox" name='sort' id='sort' onChange={changeSort} checked={sort} />
                                            <label htmlFor="sort">Ordenar Alfabéticamente</label>
                                        </>
                                    }


                                </div>
                                
                               <Box sx={{marginRight:1}}>
                               {(sells || products) &&
                                        <FormControl sx={{ m: 1, width: 300 }}>
                                            <InputLabel id="filterByStore">Filtrar Por Tienda</InputLabel>
                                            <Select
                                                labelId="filterByStore"
                                                id="filterByStore"
                                                multiple
                                                value={storeName}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Filtrar Por Tienda" />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {stores?.map((store: IStores, index) => (
                                                    <MenuItem key={index} value={store.address}>
                                                        <Checkbox checked={storeName.indexOf(store.address) > -1} />
                                                        <ListItemText primary={store.address} />
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>

                                    }
                               </Box>
                            </div>
                        </Box>
                    </Box>
                    <Container sx={{ minWidth: "100%", marginTop: 2 }} maxWidth='lg'>

                        <ToastContainer position="top-center" autoClose={750} hideProgressBar={true} />
                        <div className={styles.containerOptionsPerfil} id='optionsPerfil'>
                            <OptionsProfile />
                        </div>
                        <div>


                            {(products && productsDataSorted && categories && useProducts
                                && stores) &&
                                <Table
                                    products={(search == '' && storeName.length == stores.length) ? products : useProducts}
                                    productsSorted={productsDataSorted}
                                    sort={sort}
                                    categories={categories}
                                    stores={stores}
                                />
                            }
                            {(categories && useCategories && categoriesDataSorted) &&
                                <TableParams
                                    categories={search == '' ? categories : useCategories}
                                    categoriesSorted={categoriesDataSorted}
                                    sort={sort} />
                            }
                            {
                                (sells && useSells && sellsDataSorted
                                    && sellDate && sellTotalPrice &&
                                    products && stores) &&
                                <TableSells
                                    sell={(storeName.length == stores.length) ? sells : useSells}
                                    sellsDataSorted={sellsDataSorted}
                                    sort={sort}
                                    sellDate={sellDate}
                                    sellTotalPrice={sellTotalPrice}
                                    products={products}
                                    stores={stores}
                                />
                            }
                            {
                                (stores && useStores && storesDataSorted) &&
                                <TableStores
                                    stores={search == '' ? stores : useStores}
                                    storesSorted={storesDataSorted}
                                    sort={sort}
                                />
                            }
                        </div>
                    </Container>
                </>
            }
        </>
    )
}