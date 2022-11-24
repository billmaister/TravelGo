import { useEffect, useState } from "react";
import styles from "./Countries.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MainHeader from "../MainHeader/MainHeader";
import { Link } from "react-router-dom";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import { useAppContext } from "../../context/appContext";

function Countries({ continent }) {
  const [err, setErr] = useState({ status: false, message: "" });
  const [color, setColor] = useState("gray");
  const { user } = useAppContext();
  // get countries list using continent name with useEffect and API call
  //maybe an object {country: '', isFavorite: ''}
  const [countries, setCountries] = useState([]);
  //add a country to favorite list(if logged in)
  const handleFavorites = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setColor("red");
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
            {countries.map((country) => (
              <Link
                to={`/destinations/${country.name}`}
                className={styles.card}
              >
                <li key={country}>
                  <div className={styles.imgContainer}>
                    <img src={country.urlImage} alt={country.name} />
                    {user && (
                      <FontAwesomeIcon
                        className={styles.like}
                        icon={faHeart}
                        color={color}
                        onClick={handleFavorites}
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
