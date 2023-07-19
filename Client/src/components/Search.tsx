import styles from '../css/search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';

interface SearchProps {
    setSearch: Dispatch<SetStateAction<string>>;
}

function Search({ setSearch }: SearchProps) {
    return (
        <div className={styles.containerSearch} id='search'>
            <input type="text" placeholder='Buscar...' onChange={(e) => { setSearch(e.target.value) }} />
            <button><FontAwesomeIcon icon={faMagnifyingGlass} size='lg' className={styles.icon} /></button>
        </div>
    )
}

export default Search