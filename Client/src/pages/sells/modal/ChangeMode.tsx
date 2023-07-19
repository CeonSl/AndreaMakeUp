import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { Dispatch, SetStateAction } from 'react';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

interface props {
    modalSetScan: boolean,
    setModalSetScan: Dispatch<SetStateAction<boolean>>,
    scan: boolean,
    handleChange: () => void
}

export const ChangeMode = ({modalSetScan, setModalSetScan, scan, handleChange}:props) => {
    return (
        <Modal open={modalSetScan} onClose={() => setModalSetScan(false)}>
            <ModalDialog
                variant="outlined"
                role="alertdialog"
                sx={{ width: .25 }}
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
            >
                <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    startDecorator={<ChangeCircleIcon />}
                >
                    Modo
                </Typography>
                <Divider />
                <Typography id="alert-dialog-modal-description" textColor="text.tertiary" sx={{ textAlign: 'center' }}>
                    ¿Quieres cambiar al modo de {scan ? 'tabla' : 'scanner'}?
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                    <Button variant="plain" color="neutral" onClick={() => { setModalSetScan(!modalSetScan) }}>
                        No
                    </Button>
                    <Button variant="solid" sx={{ bgcolor: '#D14D72', ':hover': { bgcolor: '#D14D72ee' } }} onClick={() => { handleChange() }}>
                        Si
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    )
}