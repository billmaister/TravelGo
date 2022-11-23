// import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorBoundry from '../../components/ErrorBoundry/ErrorBoundry';
import Footer from '../../components/Footer/Footer';
import MainHeader from '../../components/MainHeader/MainHeader';
import Modal from '../../components/Modal/Modal';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Country.module.css';

function Country() {
    const params = useParams();
    const [err, setErr] = useState({ status: false, message: '' });
    const [country, setCountry] = useState({});
    const [cities, setCities] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = (newPlace) => () => {
        setIsModalOpen((prev) => !prev);
        setSelectedPlace(newPlace);
    };
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const getCountryDetails = async () => {
        try {
            await fetch(`/api/countries/country/${params.country.toLowerCase()}`)
                .then((res) => res.json())
                .then((dataObj) => {
                    if(dataObj.msg){
                        throw new Error(dataObj.msg);
                    } else {
                        setCountry(dataObj.data);
                        getCities(dataObj.data._id);
                    }
                });
        } catch (err) {
            setErr({ status: true, message: err.message });
        }
    };
    const getCities = async (countryId) => {
        try {
            await fetch(`/api/cities/cities/${countryId}`)
                .then((res) => res.json())
                .then((dataObj) => {
                    if(dataObj.msg){
                        throw new Error(dataObj.msg);
                    } else {
                        setCities(dataObj.data);
                    }
                });
        } catch (err) {
            setErr({ status: true, message: err.message });
        }
    };
    useEffect(() => {
        window.scrollTo(0,0);
        getCountryDetails();
    }, []);
    return (
        <div>
            <Navbar />
            {err.status ? <ErrorBoundry message={err.message} isModal={true} /> :
            <>
                <div className={styles.heroContainer}>
                    <img src={country.urlImage} alt={country.name} />
                    <div className={styles.countryDescription}>
                        <MainHeader title={capitalizeFirstLetter(params.country)} />
                        <p> {country.description} </p>
                    </div>
                </div>
                <div className={styles.places}>
                    <div className={styles.countriesContainer}>
                        <MainHeader title={`Places to See in ${capitalizeFirstLetter(params.country)}`} />
                        <ul>
                            {cities.map((city) =>
                                <div className={styles.card} onClick={toggleModal(city)}>
                                    <li key={city.name}>
                                        <div className={styles.imgContainer}>
                                            {/* fill src attr with image url from api */}
                                            <img src={city.urlImage} alt={city.name} />
                                        </div>
                                        <div className={styles.caption}>
                                            <div className={styles.name}>
                                                {capitalizeFirstLetter(city.name)}
                                            </div>
                                            {/* <div className={styles.title}>{city.title}</div> */}
                                        </div>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </>}
            {selectedPlace &&
                <Modal
                    key={selectedPlace.name}
                    open={isModalOpen}
                    onClose={toggleModal(null)}
                    className={styles.modal}
                >
                    <MainHeader title={capitalizeFirstLetter(selectedPlace.name)} />
                    <p className={styles.placeDescription}>
                        {selectedPlace.description}
                    </p>
                    {/* <p className={styles.placeLocation}>
                        <span><FontAwesomeIcon icon={faLocationDot} /></span>
                        {selectedPlace.location}
                    </p> */}
                </Modal>}
            <Footer />
        </div>
    );
}

export default Country;