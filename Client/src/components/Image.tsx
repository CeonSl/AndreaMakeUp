import stylesAddProduct from '../css/add.module.css';

interface props {
    photo: { name: string, src: string | ArrayBuffer }
}

export default function ImageTag({ photo }: props) {
    return (<>
        <div className={stylesAddProduct.imgUploaded}>
            <img src={photo.src.toString()} alt={photo.name} />
        </div>
    </>)
}