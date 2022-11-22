import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import ScrollingBox from "../../components/ScrollingBox/ScrollingBox";
import SearchDestination from "../../components/SearchDestination/SearchDestination";
//import styles from "./Home.module.css";

function Home() {
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
    return (
        <>
            <Navbar />
            <Hero />
            <SearchDestination />
            <ScrollingBox
                title='Top Countries'
                caption='Recommended our most popular locations for you!'
                elements={recomCountries}
            />
            <ScrollingBox
                title='Latest Activities'
                caption='What kind of events do you like?'
                elements={recomCountries}
            />
            <Footer />
        </>
    );
}

export default Home;