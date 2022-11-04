import styles from './Continents.module.css';

function Continents({ selectContinent }) {
    const chooseContinent = (name) => () => {
        selectContinent(name);
    };
    return (
        <div className={styles.flexContainer}>
            <button
                className={`${styles.flexItem} ${styles.europe}`}
                onClick={chooseContinent('europe')}
                >
                    Europe
            </button>
            <button
                className={`${styles.flexItem} ${styles.asia}`}
                onClick={chooseContinent('asia')}
                >
                Asia
            </button>
            <button
                className={`${styles.flexItem} ${styles.africa}`}
                onClick={chooseContinent('africa')}
                >
                Africa
            </button>
            <button
                className={`${styles.flexItem} ${styles.namerica}`}
                onClick={chooseContinent('north_america')}
                >
                    North America
            </button>
            <button
                className={`${styles.flexItem} ${styles.samerica}`}
                onClick={chooseContinent('south_america')}
                >
                    South America
            </button>
            <button
                className={`${styles.flexItem} ${styles.australia}`}
                onClick={chooseContinent('australia')}
                >
                    Australia
            </button>
        </div>
    );
}

export default Continents;