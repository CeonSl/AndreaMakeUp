import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../css/optionButtons.module.css'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';

interface propsButtons {
    id: number,
    typeTable: number,
}

function OptionButtons({ id, typeTable }: propsButtons) {
    const deletes = ['products/delete', 'categories/delete', 'sells/delete', 'stores/delete']
    const edits = ['products/edit', 'categories/edit', 'sells/edit', 'stores/edit']
    const [modalDelete, setModalDelete] = useState<boolean>(false)

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Link to={`/${edits[typeTable]}/${id}`}>
                <FontAwesomeIcon className={styles.icon} icon={faPenToSquare} size='lg' color='green' />
            </Link>
            <FontAwesomeIcon className={styles.icon} onClick={() => { setModalDelete(!modalDelete) }} icon={faTrash} size='lg' color='red' />
            <Modal open={modalDelete} onClose={() => setModalDelete(false)}>
                <ModalDialog
                    variant="outlined"
                    role="alertdialog"
                    aria-labelledby="alert-dialog-modal-title"
                    aria-describedby="alert-dialog-modal-description"
                >
                    <Typography
                        id="alert-dialog-modal-title"
                        component="h2"
                        startDecorator={<WarningRoundedIcon />}
                    >
                        Confirmación
                    </Typography>
                    <Divider />
                    <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
                        ¿Estás seguro que quieres eliminar este registro?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant="plain" color="neutral" onClick={() => { setModalDelete(!modalDelete) }}>
                            No
                        </Button>
                        <Link to={`/${deletes[typeTable]}/${id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                            <Button variant="solid" color="danger" onClick={() => { setModalDelete(!modalDelete) }}>
                                Si
                            </Button>
                        </Link>
                    </Box>
                </ModalDialog>
            </Modal>
        </div>
    )
}

export default OptionButtons