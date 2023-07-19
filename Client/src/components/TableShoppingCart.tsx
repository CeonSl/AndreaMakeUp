import { Dispatch, SetStateAction, useEffect } from 'react'
import stylesAddSell from '../css/addSell.module.css'
import { IProducts } from '../types/Products'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Table as MUITable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableShoppingCartProps {
    productsShopping: IProducts[],
    deleteProductShopping: (product: IProducts, productsShopping: IProducts[],
        setProductsShopping: Dispatch<SetStateAction<IProducts[]>>, setTotal: Dispatch<SetStateAction<number>>,
        putResults: (products: IProducts[]) => void) => void,
    setProductsShopping: Dispatch<SetStateAction<IProducts[]>>,
    setTotal: Dispatch<SetStateAction<number>>,
    putResults: (products: IProducts[]) => void

}

export function TableShoppingCart({ productsShopping, deleteProductShopping, setProductsShopping, putResults, setTotal }: TableShoppingCartProps) {
    let i = 0

    useEffect(() => {
    }, [productsShopping])


    return (
        <>
            <TableContainer id="table" component={Paper} sx={{ marginTop:7.5,width: 1, minHeight:"450px", maxHeight: "450px" }}>
                <MUITable aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>N°</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Precio Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {((productsShopping).map((productShopping: IProducts, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{++i}</TableCell>
                                <TableCell>{productShopping.name}</TableCell>
                                <TableCell>{productShopping.stock}</TableCell>
                                <TableCell>S/. {(productShopping.price * productShopping.stock).toFixed(2)}</TableCell>
                                <TableCell><FontAwesomeIcon icon={faXmark} className={stylesAddSell.iconDelete} size={'lg'} onClick={() => {
                                    deleteProductShopping(productShopping, productsShopping, setProductsShopping,
                                        setTotal, putResults);
                                }} /></TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                </MUITable>
            </TableContainer>
        </>

    )
}