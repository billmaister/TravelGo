import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <div className={styles.navContainer}>
            <div className={styles.logo}><Logo /></div>
            <nav className={styles.nav}>
                <Link to="/" className={styles.navItem}>Home</Link>
                <Link to="/" className={styles.navItem}>My Favorites</Link>
                <Link to="/" className={styles.navItem}>Login</Link>
                <Button name="Sign Up" onClick={() => {}} className={styles.navItem} />
            </nav>
        </div>
    );
}

export default Navbar;