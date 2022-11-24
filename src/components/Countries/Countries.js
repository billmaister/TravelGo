import { useEffect, useState } from "react";
import styles from "./Countries.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MainHeader from "../MainHeader/MainHeader";
import { Link } from "react-router-dom";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import { useAppContext } from "../../context/appContext";
import axios from "axios";

function Countries({ continent }) {
  const [err, setErr] = useState({ status: false, message: "" });
  const [colors, setColors] = useState([]);
  const { user, token } = useAppContext();
  const [countries, setCountries] = useState([]);
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
  const getCountries = async () => {
    try {
      await fetch(`/api/countries/countries/${continent}`)
        .then((res) => res.json())
        .then((dataObj) => {
          if (dataObj.msg) {
            throw Error(dataObj.msg);
          } else {
            setCountries(dataObj.data);
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
    getCountries();
  }, [continent]);
  return (
    <>
      {err.status ? (
        <ErrorBoundry message={err.message} isModal={true} />
      ) : (
        <div className={styles.countriesContainer}>
          <MainHeader title="Discover Countries" />
          <ul>
            {countries.map((country, index) => (
              <Link
                to={`/destinations/${country.name}`}
                className={styles.card}
                key={index}
              >
                <li>
                  <div className={styles.imgContainer}>
                    <img src={country.urlImage} alt={country.name} />
                    {user && (
                      <FontAwesomeIcon
                        className={styles.like}
                        icon={faHeart}
                        color={!colors[index] ? "gray" : "red"}
                        onClick={handleFavourites(country._id, index)}
                      />
                    )}
                  </div>
                  <div className={styles.caption}>
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    {capitalizeFirstLetter(country.name)}
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

export default Countries;
