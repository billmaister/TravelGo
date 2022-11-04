import styles from './MainHeader.module.css';

function MainHeader({ title }) {
    return (
        <h1 className={styles.head}> {title} </h1>
    );
}

export default MainHeader;