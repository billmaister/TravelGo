import { useState } from 'react';
import Continents from '../../components/Continents/Continents';
import MainHeader from '../../components/MainHeader/MainHeader';
import styles from './Destinations.module.css';

function Destinations() {
    const [destination, setDestination] = useState('');
    const handleChangeDestination = (e) => {
        setDestination(e.target.value);
    }
    return (
        <div className={styles.container}>
            <div className={styles.headContainer}>
                <MainHeader title='Where do you want to be?' />
                <input
                    className={styles.searchbar}
                    type='text'
                    value={destination}
                    onChange={handleChangeDestination}
                    placeholder='Search destinations'
                />
                <input className={styles.submitBtn} type='submit' value='Go' disabled={!destination} />
            </div>
            <Continents />
        </div>
    );
}

export default Destinations;