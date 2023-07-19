import { OnResultFunction, QrReader } from 'react-qr-reader'
import stylesAddSell from '../css/addSell.module.css'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IProducts } from '../types/Products';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

interface props {
    selectedDeviceId: string,
    handleDeviceIdChange: (event: SelectChangeEvent<string>) => void,
    products: IProducts[],
    setResult: Dispatch<SetStateAction<string | null>>,
    setModal: Dispatch<SetStateAction<boolean>>,
    modal: boolean,
    setProductToAdd: Dispatch<SetStateAction<IProducts | undefined>>
}

export default function QrReaderComp({ selectedDeviceId, handleDeviceIdChange,
    products, setResult, setModal, modal, setProductToAdd }: props) {
    const [cameraPermission, setCameraPermission] = useState<boolean>(false);
    const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
    const handleScan: OnResultFunction = (result, error, codeReader) => {
        if (result) {
            const productsUse: IProducts[] = [...products]
            let productSend: IProducts = { id: 0, name: '', price: 0, stock: 0, category_id: 0, img: '', store_id: 0 }
            setResult(result.getText());
            if (result.getText() != '') {
                setModal(!modal)
                const idProduct = result.getText().split('/').pop()
                console.log(idProduct);
                if (idProduct) {
                    for (let i = 0; i < productsUse.length; i++) {
                        if (productsUse[i].id == parseInt(idProduct)) {
                            productSend = productsUse[i]
                        }
                    }
                }
            }
            setProductToAdd(productSend);
        }
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                setCameraPermission(true)
                navigator.mediaDevices.enumerateDevices().then((devices) => {
                    const videoDevices = devices.filter((device) => device.kind === "videoinput");
                    setAvailableDevices(videoDevices);
                });
            }).catch(() => {
                setCameraPermission(false)
            })
    }, [])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    console.log(selectedDeviceId);
    return (
        <>
            <div className={stylesAddSell.scanner}>
                <QrReader
                    key={selectedDeviceId} // allow update selectedDeviceId telling to React it needs to update it
                    scanDelay={300}
                    onResult={handleScan}
                    constraints={{ aspectRatio: 1 / 1, width: 200, deviceId: selectedDeviceId }}
                />
            </div>
            <FormControl sx={{ m: 1, marginLeft: 0, width: 1, paddingRight: 1, marginTop: 2 }}>
                <InputLabel id="device_id">Cámara</InputLabel>
                <Select
                    labelId="device_id"
                    fullWidth
                    id="device_id"
                    name="device_id"
                    input={<OutlinedInput label="Cámara" />}
                    MenuProps={MenuProps}
                    value={`${selectedDeviceId != '' ? selectedDeviceId : availableDevices.length > 0 ? availableDevices[0].deviceId : ''}`} 
                    onChange={(e) => { handleDeviceIdChange(e) }}
                >
                    {availableDevices.map((device: MediaDeviceInfo) => (
                        <MenuItem key={device.deviceId} value={device.deviceId}>
                            {device.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}