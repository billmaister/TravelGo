import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import MainHeader from '../../components/MainHeader/MainHeader';
import Modal from '../../components/Modal/Modal';
import Navbar from '../../components/Navbar/Navbar';
import pic from '../../images/liam-burnett-blue-xBnqIf2vy7M-unsplash.jpg';
import styles from './Country.module.css';

function Country() {
    const txt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit \
    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt \
    in culpa qui officia deserunt mollit anim id est laborum.';
    const params = useParams();
    //get country info based on params.country
    //get places info in the form of:
    const [places, setPlaces] = useState([
        {name: 'Suomenlinna', title: 'Walking trails', description: txt, location: 'Unioninkatu 29, 00170 Helsinki'},
        {name: 'Helsinki Cathedral', title: 'Landmark 19th-century religious edifice', description: txt, location: 'Unioninkatu 29, 00170 Helsinki'},
    ]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = (newPlace) => () => {
        setIsModalOpen((prev) => !prev);
        setSelectedPlace(newPlace);
    }
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <div>
            <Navbar />
            <div className={styles.countryDescription}>
                <MainHeader title={capitalizeFirstLetter(params.country)} />
                <p> {txt} </p>
            </div>
            <div className={styles.places}>
                <div className={styles.countriesContainer}>
                    <MainHeader title={`Places to See in ${params.country}`} />
                    <ul>
                        {places.map((place) =>
                            <div className={styles.card} onClick={toggleModal(place)}>
                                <li key={place.name}>
                                    <div className={styles.imgContainer}>
                                        {/* fill src attr with image url from api */}
                                        <img src={pic} alt={place.name} />
                                    </div>
                                    <div className={styles.caption}>
                                        <div className={styles.name}>{place.name}</div>
                                        <div className={styles.title}>{place.title}</div>
                                    </div>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
            {selectedPlace && <Modal key={selectedPlace.name} open={isModalOpen} onClose={toggleModal(null)}>
                <MainHeader title={selectedPlace.name} />
                <p className={styles.placeDescription}>
                    {selectedPlace.description}
                </p>
                <p className={styles.placeLocation}>
                    <span><FontAwesomeIcon icon={faLocationDot} /></span>
                    {selectedPlace.location}
                </p>
            </Modal>}
            <Footer />
        </div>
    );
}

export default Country;