import { category } from "../logic/RecieveCategory";
import OptionButtons from "./OptionButtons";
import { IProducts } from "../types/Products";
import { IParams } from "../types/Params";
import { useEffect } from "react";
import QRCode from 'qrcode'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { IStores } from "../types/Stores";
import { store } from "../logic/RecieveStore";
import { Box, Table as MUITable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { exportExcelFileProducts } from "../logic/exports/excel/exportExcelProducts";


interface tableProps {
    products: IProducts[],
    productsSorted: IProducts[],
    sort: boolean,
    categories: IParams[],
    stores: IStores[]
}

export function Table({ products, productsSorted, sort, categories, stores }: tableProps) {
    let i = 0
    const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL
    
    useEffect(() => {
    }, [products])

    const genQR = (product: IProducts) => {
        let result: string = ''
        QRCode.toDataURL(`${baseUrl}/product/${product.id}`, (err, url) => {
            if (err) return console.log(err);
            result = url
        })
        return result
    }

    return (
        <>
            <Box sx={{marginBottom:1}}>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', margin: 2 }} onClick={() => {exportExcelFileProducts(products, stores, categories)}}>
                    <FontAwesomeIcon icon={faFileExcel} size='2xl' color='darkgreen' />
                </button>
            </Box>
            <TableContainer id="table" component={Paper} sx={{ width: 1, maxHeight: "580px" }}>
                <MUITable aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>N°</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Tienda</TableCell>
                            <TableCell>QR</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {((sort ? productsSorted : products).map((product: IProducts) => (
                            product.stock != 0 &&
                            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{++i}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{category(product.category_id, categories)}</TableCell>
                                <TableCell>S/. {product.price.toFixed(2)}</TableCell>
                                {
                                    product.stock < 5 ?
                                        <TableCell sx={{ color: '#f00' }}>{product.stock}</TableCell>
                                        :
                                        <TableCell>{product.stock}</TableCell>
                                }
                                <TableCell>{store(product.store_id, stores)}</TableCell>
                                <TableCell><a style={{ color: '#D14D72' }} href={genQR(product)} download={`${product.name}.png`}><FontAwesomeIcon icon={faQrcode} size="2xl" /></a></TableCell>
                                <TableCell><OptionButtons id={product.id} typeTable={0} /></TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                </MUITable>
            </TableContainer>
        </>
    )
}