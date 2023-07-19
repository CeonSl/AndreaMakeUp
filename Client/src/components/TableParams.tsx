import OptionButtons from "./OptionButtons";
import { IParams } from "../types/Params";
import { useEffect } from "react";
import { Table as MUITable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface tableProps {
    categories: IParams[],
    categoriesSorted: IParams[],
    sort: boolean,
}

export function TableParams({ categories, categoriesSorted, sort }: tableProps) {
    let i = 0

    useEffect(() => {
    }, [categories])

    return (
        <TableContainer component={Paper} sx={{ width: 1, maxHeight: "600px" }}>
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
                    {((sort ? categoriesSorted : categories).map((category: IParams) => (
                        <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{++i}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>{category.type}</TableCell>
                            <TableCell><OptionButtons id={category.id} typeTable={1} /></TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </MUITable>
        </TableContainer>

    )
}