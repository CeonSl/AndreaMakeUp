import OptionButtons from "./OptionButtons";
import { useEffect } from "react";
import { DateSell, ISell, ISells } from "../types/Sells";
import { product } from "../logic/RecieveProduct";
import { sellRecieve } from "../logic/RecieveSell";
import { GetDate } from "../logic/GetDate";
import { IProducts } from "../types/Products";
import { store } from "../logic/RecieveStore";
import { IStores } from "../types/Stores";
import { Box, Table as MUITable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { exportExcelFileSells } from "../logic/exports/excel/exportExcelSells";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

interface tableProps {
    sell: ISells[],
    sellsDataSorted: ISells[],
    sort: boolean,
    sellDate: DateSell[],
    sellTotalPrice: ISell[],
    products: IProducts[],
    stores: IStores[]
}

export function TableSells({ sell, sellsDataSorted, sort, sellDate,
    sellTotalPrice, products, stores }: tableProps) {
    let i = 0

    useEffect(() => {
    }, [sell])

    return (
        <>
            <Box sx={{marginBottom:1}}>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', margin: 2 }} onClick={() => { exportExcelFileSells(sell, products, stores, sellTotalPrice, sellDate) }}>
                    <FontAwesomeIcon icon={faFileExcel} size='2xl' color='darkgreen' />
                </button>
            </Box>
            <TableContainer component={Paper} sx={{ width: 1, maxHeight: "580px" }}>
                <MUITable aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>N°</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Precio Total</TableCell>
                            <TableCell>Fecha Hora</TableCell>
                            <TableCell>Tienda</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {((sort ? sellsDataSorted : sell).map((sells_sing: ISells) => (
                            <TableRow key={sells_sing.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{++i}</TableCell>
                                <TableCell>{product(sells_sing.product_id, products)}</TableCell>
                                <TableCell>{sells_sing.quantity}</TableCell>
                                <TableCell>S/. {sellRecieve(sells_sing.sell_id, sellTotalPrice)?.toFixed(2)}</TableCell>
                                <TableCell>{GetDate(sellDate, sells_sing.sell_id)}</TableCell>
                                <TableCell>{store(sells_sing.store_id, stores)}</TableCell>
                                <TableCell><OptionButtons id={sells_sing.id} typeTable={2} /></TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                </MUITable>
            </TableContainer>
        </>
    )
}