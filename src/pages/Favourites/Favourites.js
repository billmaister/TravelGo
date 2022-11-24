import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import ErrorBoundry from '../../components/ErrorBoundry/ErrorBoundry';
import MainHeader from '../../components/MainHeader/MainHeader';
import { useAppContext } from '../../context/appContext';
import styles from './Favourites.module.css';
import axios from 'axios';

function Favourites(){
    const [err, setErr] = useState({ status: false, message: "" });
    const [colors, setColors] = useState([]);
    const { user, token } = useAppContext();
    const [favourites, setFavourites] = useState([]);
    const handleFavourites = (countryID, index) => async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          },
        };
        const data = { id: countryID };
        colors[index] ?
        await axios.delete('api/countries/favourite', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            data: {
              id: countryID,
            }
        }) :
          await axios.post('api/countries/favourite', data, config);
        const newColors = colors.slice();
        newColors[index] = !newColors[index];
        setColors(newColors);
    };
    const getFavourites = async () => {
      try {
        await fetch(`/api/countries/favourite`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
          .then((res) => res.json())
          .then((dataObj) => {
            if (dataObj.msg) {
              throw Error(dataObj.msg);
            } else {
              setFavourites(dataObj.data);
              setColors(new Array(dataObj.data.length).fill(true));
            }
          });
      } catch (err) {
        setErr({ status: true, message: err.message });
      }
    };
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    useEffect(() => {
      getFavourites();
    }, []);
    return (
      <>
        <Navbar />
        {err.status ? (
          <ErrorBoundry message={err.message} isModal={true} />
        ) : (
          <div className={styles.favouritesContainer}>
            <MainHeader title="Your Favourite Places!" />
            <ul>
              {favourites.map((favourite, index) => (
                <Link
                  to={`/destinations/${favourite.name}`}
                  className={styles.card}
                >
                  <li key={favourite}>
                    <div className={styles.imgContainer}>
                      <img src={favourite.urlImage} alt={favourite.name} />
                      {user && (
                        <FontAwesomeIcon
                          className={styles.like}
                          icon={faHeart}
                          color={!colors[index] ? "gray" : "red"}
                          onClick={handleFavourites(favourite._id, index)}
                        />
                      )}
                    </div>
                    <div className={styles.caption}>
                      <span>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </span>
                      {capitalizeFirstLetter(favourite.name)}
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </>
    );
}

export default Favourites;