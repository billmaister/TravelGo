import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Activity from "../../components/Activity/Activity";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/Navbar/Navbar";
import ScrollingBox from "../../components/ScrollingBox/ScrollingBox";
import SearchDestination from "../../components/SearchDestination/SearchDestination";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityId, setActivityId] = useState("");
  const [recomCountries, setRecomCountries] = useState([]);
  const [recomActivities, setRecomActivities] = useState([]);
  const handleClickCountry = (name, id) => {
    navigate(`/destinations/${name}`);
  };
  const handleClickActivity = (name, id) => {
    setIsModalOpen(true);
    setActivityId(id);
  };
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const getData = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}api/countries/recommendations`
      )
        .then((res) => res.json())
        .then((dataObj) => setRecomCountries(dataObj.data));
      await fetch(`${process.env.REACT_APP_API_URL}api/events/recommendations`)
        .then((res) => res.json())
        .then((dataObj) => setRecomActivities(dataObj.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <SearchDestination />
      <ScrollingBox
        title="Top Countries"
        caption="Recommended our most popular locations for you!"
        elements={recomCountries}
        onClick={handleClickCountry}
      />
      <ScrollingBox
        title="Latest Activities"
        caption="What kind of events do you like?"
        elements={recomActivities}
        onClick={handleClickActivity}
      />
      <Modal open={isModalOpen} onClose={toggleModal} className={styles.modal}>
        <Activity id={activityId} />
      </Modal>
      <Footer />
    </>
  );
}

export default Home;
