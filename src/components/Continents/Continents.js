import styles from './Continents.module.css';

function Continents() {
    return (
        <div className={styles.flexContainer}>
            <button className={`${styles.flexItem} ${styles.europe}`} onClick={() => {}}>Europe</button>
            <button className={`${styles.flexItem} ${styles.asia}`} onClick={() => {}}>Asia</button>
            <button className={`${styles.flexItem} ${styles.africa}`} onClick={() => {}}>Africa</button>
            <button className={`${styles.flexItem} ${styles.namerica}`} onClick={() => {}}>North America</button>
            <button className={`${styles.flexItem} ${styles.samerica}`} onClick={() => {}}>South America</button>
            <button className={`${styles.flexItem} ${styles.australia}`} onClick={() => {}}>Australia</button>
        </div>
    );
}

export default Continents;