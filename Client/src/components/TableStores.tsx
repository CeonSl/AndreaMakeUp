import OptionButtons from "./OptionButtons";
import { useEffect } from "react";
import { IStores } from "../types/Stores";
import { Table as MUITable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface tableProps {
    stores: IStores[],
    storesSorted: IStores[],
    sort: boolean,
}

export function TableStores({ stores, storesSorted, sort }: tableProps) {
    let i = 0

    useEffect(() => {
    }, [stores])

    return (
        <TableContainer component={Paper} sx={{ width: 1, maxHeight:"600px" }}>
            <MUITable aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>N°</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {((sort ? storesSorted : stores).map((store: IStores) => (
                        <TableRow key={store.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{++i}</TableCell>
                            <TableCell>{store.address}</TableCell>
                            <TableCell><OptionButtons id={store.id} typeTable={3} /></TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </MUITable>
        </TableContainer>
    )
}