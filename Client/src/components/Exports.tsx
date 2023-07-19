import { faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/exports.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Exports() {
    return (
        <div className={styles.containerExports}>
            <FontAwesomeIcon className={styles.excel} icon={faFileExcel} size='2xl' color='darkgreen' />
            <FontAwesomeIcon className={styles.pdf} icon={faFilePdf} size='2xl' color='darkred' />
        </div >
    )
}

export default Exports