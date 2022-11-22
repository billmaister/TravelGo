import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Activity from "../../components/Activity/Activity";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/Navbar/Navbar";
import ScrollingBox from "../../components/ScrollingBox/ScrollingBox";
import SearchDestination from "../../components/SearchDestination/SearchDestination";
//import styles from "./Home.module.css";

function Home() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activityName, setActivityName] = useState('');
    const [recomCountries, setRecomCountries] = useState([
        {name: 'Finland'},
        {name: 'Sweden'},
        {name: 'USA'},
        {name: 'England'},
        {name: 'Germany'},
        {name: 'Italy'},
        {name: 'Spain'},
        {name: 'Greece'},
        {name: 'Belgium'},
        {name: 'Canada'}
    ]);
    const handleClickCountry = (name) => {
        navigate(`/destinations/${name}`);
    };
    const handleClickActivity = (name) => {
        setIsModalOpen(true);
        setActivityName(name);
    };
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };
    return (
        <>
            <Navbar />
            <Hero />
            <SearchDestination />
            <ScrollingBox
                title='Top Countries'
                caption='Recommended our most popular locations for you!'
                elements={recomCountries}
                onClick={handleClickCountry}
            />
            <ScrollingBox
                title='Latest Activities'
                caption='What kind of events do you like?'
                elements={recomCountries}
                onClick={handleClickActivity}
            />
            <Modal open={isModalOpen} onClose={toggleModal}>
                <Activity name={activityName} />
            </Modal>
            <Footer />
        </>
    );
}

export default Home;