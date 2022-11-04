import { useState } from 'react';
import styles from './Countries.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import pic from '../../images/liam-burnett-blue-xBnqIf2vy7M-unsplash.jpg';
import MainHeader from '../MainHeader/MainHeader';
import { Link } from 'react-router-dom';

function Countries({ continent }) {
    const [color, setColor] = useState('gray');
    // get countries list using continent name with useEffect and API call
    //maybe an object {country: '', isFavorite: ''}
    const [countries, setCountries] = useState(['Finland', 'Sweden', 'Denmark', 'Germany', 'France']);
    //add a country to favorite list(if logged in)
    const handleFavorites = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setColor('red');
    };
    return (
        <div className={styles.countriesContainer}>
            <MainHeader title='Discover Countries' />
            <ul>
                {countries.map((country) =>
                    <Link to='/destination/:country' className={styles.card}>
                        <li key={country}>
                            <div className={styles.imgContainer}>
                                {/* fill src attr with image url from api */}
                                <img src={pic} alt={country} />
                                <FontAwesomeIcon
                                    className={styles.like}
                                    icon={faHeart}
                                    color={color}
                                    onClick={handleFavorites}
                                />
                            </div>
                            <div className={styles.caption}>
                                <span><FontAwesomeIcon icon={faLocationDot} /></span>
                                {country}
                            </div>
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    );
}

export default Countries;