import styles from "./Logo.module.css";

function Logo() {
    return (
        <div className={styles.logo}>
            <span className={styles.txt}>
                TravelG
            </span>
            <span className={styles.circle}></span>
        </div>
    );
}

export default Logo;