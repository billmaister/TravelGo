import { useState } from 'react';
import MainHeader from '../MainHeader/MainHeader';
import styles from './SearchDestination.module.css';

function SearchDestination() {
    const [destination, setDestination] = useState('');
    const handleChangeDestination = (e) => {
        setDestination(e.target.value);
    }
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchContent}>
                <MainHeader title='Start Your Extraordinary Trip' className={styles.searchTxt} />
                <div className={styles.searchbarContainer}>
                    <input
                        className={styles.searchbar}
                        type='text'
                        value={destination}
                        onChange={handleChangeDestination}
                        placeholder='Search destinations'
                    />
                    <input className={styles.submitBtn} type='submit' value='Go' disabled={!destination} />
                </div>
            </div>
        </div>
    );
}

export default SearchDestination;