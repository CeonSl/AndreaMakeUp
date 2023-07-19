import { Dispatch, SetStateAction } from 'react';
import stylesAddSell from '../css/addSell.module.css'
import Search from './Search';
import { IProducts } from '../types/Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Table as MUITable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface props {
    setSearch: Dispatch<SetStateAction<string>>,
    products: IProducts[],
    modal: boolean,
    setModal: Dispatch<SetStateAction<boolean>>,
    setProductToAdd: Dispatch<SetStateAction<IProducts | undefined>>
}

export default function TableAddSellProducts({ setSearch, products, setProductToAdd, modal, setModal }: props) {
    let i = 0
    return (
        <>
            <Search setSearch={setSearch} />
            <TableContainer id="table" component={Paper} sx={{ width: 1, minHeight:"500px", maxHeight: "700px" }}>
                <MUITable aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>N°</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {((products).map((product: IProducts) => (
                            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{++i}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>S/. {product.price.toFixed(2)}</TableCell>
                                <TableCell onClick={() => { setModal(!modal); setProductToAdd(product); }}><FontAwesomeIcon className={stylesAddSell.addProduct} icon={faPlus} /> </TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                </MUITable>
            </TableContainer>
        </>
    )
}