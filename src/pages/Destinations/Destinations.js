import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Continents from "../../components/Continents/Continents";
import Countries from "../../components/Countries/Countries";
import Footer from "../../components/Footer/Footer";
import MainHeader from "../../components/MainHeader/MainHeader";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Destinations.module.css";

function Destinations() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [continent, setContinent] = useState("");
  const [notFound, setNotFound] = useState({ status: false, message: "" });
  const countriesRef = useRef();
  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
    setNotFound({ status: false, message: "" });
  };
  const selectContinent = (newContinent) => {
    setContinent(newContinent);
    countriesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const searchForDestination = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}api/countries/country/${destination}`
      )
        .then((res) => res.json())
        .then((dataObj) => {
          if (dataObj.data) {
            navigate(`/destinations/${dataObj.data.name}`);
          } else {
            setNotFound({ status: true, message: dataObj.msg });
          }
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div>
      <Navbar />
      <div className={styles.headContainer}>
        <MainHeader title="Where do you want to be?" />
        <div className={styles.searchbarContainer}>
          <div className={styles.searchInput}>
            <input
              className={styles.searchbar}
              type="text"
              value={destination}
              onChange={handleChangeDestination}
              placeholder="Search destinations"
            />
            <input
              className={styles.submitBtn}
              type="submit"
              value="Go"
              disabled={!destination}
              onClick={searchForDestination}
            />
          </div>
          {notFound.status && (
            <div className={styles.err}>
              <span>
                <FontAwesomeIcon icon={faExclamationCircle} />
              </span>
              {notFound.message}
            </div>
          )}
        </div>
      </div>
      <Continents selectContinent={selectContinent} />
      <div ref={countriesRef}>
        {continent && <Countries continent={continent} />}
      </div>
      <Footer />
    </div>
  );
}

export default Destinations;
