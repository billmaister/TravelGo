import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className={styles.navItem}>
      <div className={styles.logo}>
        <span className={styles.txt}>TravelG</span>
        <span className={styles.circle}></span>
      </div>
    </Link>
  );
}

export default Logo;
