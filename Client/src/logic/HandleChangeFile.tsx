import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleChangeFile = (e: ChangeEvent<HTMLInputElement>, setPhoto: Dispatch<SetStateAction<{ name: string, src: string | ArrayBuffer }>>) => {
    const input = e.currentTarget
    let reader = new FileReader();
    reader.onload = function () {
        const dataURL = reader.result;
        if (dataURL && input.files) {
            setPhoto({ name: input.files[0].name, src: dataURL })
        }
    }
    if (input.files && e.currentTarget) {
        reader.readAsDataURL(input.files[0])
    }
}