import styles from './MainHeader.module.css';

function MainHeader({ title, className }) {
    return (
        <h1 className={`${styles.head} ${className}`}> {title} </h1>
    );
}

export default MainHeader;