import { useRef, useState } from 'react';
import Continents from '../../components/Continents/Continents';
import Countries from '../../components/Countries/Countries';
import Footer from '../../components/Footer/Footer';
import MainHeader from '../../components/MainHeader/MainHeader';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Destinations.module.css';

function Destinations() {
    const [destination, setDestination] = useState('');
    const [continent, setContinent] = useState('');
    const countriesRef = useRef();
    const handleChangeDestination = (e) => {
        setDestination(e.target.value);
    };
    const selectContinent = (newContinent) => {
        setContinent(newContinent);
        countriesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
    };
    return (
        <div>
            <Navbar />
            <div className={styles.headContainer}>
                <MainHeader title='Where do you want to be?' />
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
            <Continents selectContinent={selectContinent}/>
            <div ref={countriesRef}>{continent && <Countries continent={continent}/>}</div>
            <Footer />
        </div>
    );
}

export default Destinations;