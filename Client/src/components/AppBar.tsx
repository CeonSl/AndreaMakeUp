import { useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper, ThemeProvider } from "@mui/material";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import SellIcon from '@mui/icons-material/Sell';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { useEffect, useState } from "react";
import { theme } from "../types/theme";
import { useNavigate } from "react-router-dom";

export function AppBarComponent() {
    const params = useLocation()
    const url = params.pathname.split('/')[1]
    console.log(url);
    const [value, setValue] = useState(`${url}`);
    const navigate = useNavigate();
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    //I'm using this to update the appbar when I press a button other than the appbar button.
    useEffect(() => {
        setValue(`${url}`)
    }, [url])

    const sendToCRUD = (url: string) => {
        //this is perfect to refreshing without reloading the page
        navigate(url)
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ position: 'fixed', bottom: '0', right: '0', left: '0', width: 1, zIndex: 100 }}>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                >
                    <BottomNavigationAction label="Gráficos" value="graphics" onClick={() => sendToCRUD('/graphics')} icon={<EqualizerIcon />} />
                    <BottomNavigationAction label="Productos" value="products" onClick={() => sendToCRUD('/products')} icon={<InventoryIcon />} />
                    <BottomNavigationAction label="Ventas" value="sells" onClick={() => sendToCRUD('/sells')} icon={<SellIcon />} />
                    <BottomNavigationAction label="Categorias" value="categories" onClick={() => sendToCRUD('/categories')} icon={<CategoryIcon />} />
                    <BottomNavigationAction label="Tiendas" value="stores" onClick={() => sendToCRUD('/stores')} icon={<AddBusinessIcon />} />
                </BottomNavigation>
            </Paper>
        </ThemeProvider>
    )
}
