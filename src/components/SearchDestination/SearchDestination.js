import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import styles from './SearchDestination.module.css';

function SearchDestination() {
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState({ status: false, message: '' });
    const [destination, setDestination] = useState('');
    const handleChangeDestination = (e) => {
        setDestination(e.target.value);
        setNotFound({ status: false, message: ''});
    };
    const searchForDestination = async () => {
        try {
        await fetch(`/api/countries/country/${destination}`)
            .then((res) => res.json())
            .then((dataObj) => {
                if(dataObj.data){
                    navigate(`/destinations/${dataObj.data.name}`);
                } else {
                    setNotFound({ status: true, message: dataObj.msg });
                }
            });
        } catch(err) {
            console.log(err.message);
        }
    };
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchContent}>
                <MainHeader title='Start Your Extraordinary Trip' className={styles.searchTxt} />
                <div className={styles.searchbarContainer}>
                    <div className={styles.searchInput}>
                        <input
                            className={styles.searchbar}
                            type='text'
                            value={destination}
                            onChange={handleChangeDestination}
                            placeholder='Search destinations'
                        />
                        <input
                            className={styles.submitBtn}
                            type='submit'
                            value='Go'
                            disabled={!destination}
                            onClick={searchForDestination}
                        />
                    </div>
                    {notFound.status &&
                    <div className={styles.err}>
                        <span><FontAwesomeIcon icon={faExclamationCircle} /></span>
                        {notFound.message}
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default SearchDestination;