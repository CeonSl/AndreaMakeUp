import { Box, CircularProgress, Container } from "@mui/material";
export function Spinner() {
    return (
        <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center'
        , height:'90vh'}}>
            <CircularProgress size={55} sx={{color:'#D14D72'}} />
        </Box>
    )
}