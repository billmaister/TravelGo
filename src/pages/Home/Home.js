import Navbar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css";

function Home() {
    return (
        <>
            <Navbar />
            <div className={styles.txt}> Home Page </div>
        </>
    );
}

export default Home;