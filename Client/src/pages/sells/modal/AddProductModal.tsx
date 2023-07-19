import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TextField } from '@mui/material';

interface props {
    modal: boolean,
    setModal: Dispatch<SetStateAction<boolean>>,
    handleClickForm: (e: FormEvent<HTMLFormElement>) => void
}

export const AddProductModal = ({ modal, setModal, handleClickForm }: props) => {
    return (
        <Modal open={modal} onClose={() => setModal(false)}>
            <ModalDialog
                variant="outlined"
                role="alertdialog"
                sx={{ width: .3 }}
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
            >
                <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    startDecorator={<AddCircleOutlineIcon />}
                >
                    Agregar
                </Typography>
                <Divider />
                <Box component='form' sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexDirection: 'column', pt: 2 }} onSubmit={handleClickForm}>
                    <Box sx={{ padding: 1, paddingLeft: 0, width: 1 }}>
                        <TextField variant="outlined" label="Cantidad" name='quantity' type='number' fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Button type='submit' sx={{ bgcolor: '#D14D72', ':hover': { bgcolor: '#D14D72ee' } }}>
                            Agregar
                        </Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    )
}